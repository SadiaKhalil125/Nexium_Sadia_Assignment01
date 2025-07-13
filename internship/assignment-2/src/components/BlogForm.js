'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function BlogForm() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const validateUrl = (url) => {
    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
    } catch {
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate URL
    let processedUrl = url.trim()
    if (!processedUrl) {
      setError('Please enter a URL')
      return
    }

    // Add https:// if missing
    if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
      processedUrl = `https://${processedUrl}`
    }

    // Validate URL format
    if (!validateUrl(processedUrl)) {
      setError('Please enter a valid URL (e.g., example.com or https://example.com)')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/summarise', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: processedUrl }),
      })

      const responseData = await response.json()
      
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to summarize blog')
      }

      setResult(responseData)
    } catch (err) {
      setError(err.message || 'An unexpected error occurred')
      console.error('API Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
    // Clear error when user starts typing
    if (error) {
      setError(null)
    }
  }

  const handleRetry = () => {
    if (url.trim()) {
      handleSubmit({ preventDefault: () => {} })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-4xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 pt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg mb-4">
            <span className="text-3xl">📝</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Blog Summariser
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform any blog article into a concise summary with instant Urdu translation using AI-powered technology
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label htmlFor="url" className="block text-lg font-semibold text-gray-800">
                📰 Blog URL
              </label>
              <div className="relative">
                <Input
                  id="url"
                  type="url"
                  placeholder="Enter blog URL (e.g., example.com or https://example.com)"
                  value={url}
                  onChange={handleUrlChange}
                  disabled={loading}
                  className="w-full h-14 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl transition-all duration-300"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={loading || !url.trim()}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  <span className="mr-2">✨</span>
                  Summarize Blog
                </span>
              )}
            </Button>
          </form>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
                <div className="text-red-700 mb-4">
                  <p className="text-base">{error}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button 
                    onClick={handleRetry}
                    variant="outline" 
                    size="sm"
                    className="bg-white border-red-300 text-red-700 hover:bg-red-50 rounded-lg px-4 py-2 font-medium"
                  >
                    🔄 Try Again
                  </Button>
                  <p className="text-sm text-red-600">
                    💡 Try a different URL or check the format
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Display */}
        {result && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              {/* Summary Section */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xl">📋</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Summary</h3>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <p className="text-gray-800 leading-relaxed text-lg">{result.summary}</p>
                </div>
              </div>
              
              {/* Urdu Translation Section */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xl">🇵🇰</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Urdu Translation</h3>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                  <p className="text-gray-800 leading-relaxed text-lg" dir="rtl">{result.urdu}</p>
                </div>
              </div>
              
              {/* Metadata Section */}
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="mr-2">🔗</span>
                    <span>Source: <a href={result.metadata?.source} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 font-medium">{result.metadata?.source}</a></span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📊</span>
                    <span>Content: {result.metadata?.length?.toLocaleString()} characters</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📝</span>
                    <span>Summary: {result.metadata?.sentences} sentences</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm pt-8">
          <p>✨ Powered by AI • Built with Next.js • Styled with Tailwind CSS</p>
        </div>
      </div>
    </div>
  )
}
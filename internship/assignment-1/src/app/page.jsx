"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const quotes = [
  { topic: "success", text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { topic: "success", text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
  { topic: "success", text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
  { topic: "growth", text: "Growth is painful. Change is painful. But nothing is as painful as staying stuck somewhere you don't belong.", author: "Mandy Hale" },
  { topic: "growth", text: "Be not afraid of growing slowly, be afraid only of standing still.", author: "Chinese Proverb" },
  { topic: "growth", text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { topic: "confidence", text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { topic: "confidence", text: "With confidence, you have won before you have started.", author: "Marcus Garvey" },
  { topic: "confidence", text: "Confidence comes not from always being right but from not fearing to be wrong.", author: "Peter T. McIntyre" }
];

export default function QuoteGenerator() {
  const [topic, setTopic] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    setIsLoading(true);
    
    // Add a slight delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const selected = quotes
      .filter((q) => q.topic.toLowerCase() === topic.toLowerCase())
      .slice(0, 3)
      .map((q) => ({ text: q.text, author: q.author }));
    setFilteredQuotes(selected);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Motivational Quotes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover inspiring quotes tailored to your interests. Enter a topic and let wisdom guide your day.
          </p>
        </div>

        {/* Search Form */}
        <div className="w-full max-w-md mb-12">
          <form onSubmit={handleSubmit} className="relative">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="space-y-6">
                <div className="relative">
                  <Input
                    placeholder="Enter a topic (e.g., success, growth, confidence)"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="h-12 text-lg bg-white/50 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-purple-200 placeholder:text-gray-400 transition-all duration-200"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-12 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Finding Quotes...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Get Inspired</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Quote Results */}
        <div className="w-full max-w-4xl">
          {filteredQuotes.length > 0 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Your Inspirational Quotes
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
              </div>
              
              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
                {filteredQuotes.map((quote, index) => (
                  <Card 
                    key={index} 
                    className="group bg-white/70 backdrop-blur-sm border-2 border-white/30 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                            </svg>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <blockquote className="text-lg text-gray-700 leading-relaxed mb-4 italic">
                            "{quote.text}"
                          </blockquote>
                          <div className="flex items-center">
                            <div className="w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></div>
                            <cite className="text-sm font-medium text-gray-600 not-italic">
                              {quote.author}
                            </cite>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {filteredQuotes.length === 0 && topic && !isLoading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.618M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-xl text-gray-600 mb-2">No quotes found for "{topic}"</p>
              <p className="text-gray-500">Try topics like "success", "growth", or "confidence"</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 
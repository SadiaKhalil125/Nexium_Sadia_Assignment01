import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

const extractContent = ($, url) => {
  console.log('🔍 Starting content extraction for:', url)
  
  // Remove unwanted elements
  $('script, style, nav, header, footer, .sidebar, .advertisement, .ads, .social-share, .comments, .related-posts, .newsletter, .popup, .modal, .cookie-banner, .ad-banner, .navigation, .menu, .breadcrumb, .pagination, .author-bio, .share-buttons, .tags, .categories, .meta, .date, .time, .author, .published, .updated, .reading-time, .word-count, .social-media, .newsletter-signup, .related-articles, .trending, .popular, .recommended').remove()
  
  // Try multiple selectors for article content
  const selectors = [
    'article', 
    'main', 
    '.post-content', 
    '.article-body',
    '.entry-content',
    '.content',
    'div[itemprop="articleBody"]',
    '.post-body',
    '.blog-post',
    '.story-body',
    '.article-content',
    '.post-text',
    '.entry-text',
    '.article-text',
    '.story-content',
    '.post-entry',
    '.article-entry',
    'section',
    '.main-content',
    '.primary-content'
  ]
  
  let text = ''
  let bestText = ''
  let bestSelector = ''
  
  console.log('🔍 Trying selectors:', selectors.slice(0, 10))
  
  for (const selector of selectors) {
    const element = $(selector)
    if (element.length > 0) {
      text = element.text()
      console.log(`🔍 Selector "${selector}": ${text.length} characters`)
      if (text && text.length > 200) {
        bestText = text
        bestSelector = selector
        console.log(`✅ Found good content with selector: ${selector}`)
        break
      } else if (text && text.length > 100 && text.length > bestText.length) {
        bestText = text
        bestSelector = selector
      }
    }
  }
  
  // If we found good content, return it
  if (bestText && bestText.length > 100) {
    console.log(`✅ Using content from selector: ${bestSelector} (${bestText.length} chars)`)
    return bestText
  }
  
  // Fallback: try to find the largest text block
  console.log('🔍 Trying paragraph fallback...')
  const paragraphs = $('p').map((i, el) => $(el).text().trim()).get()
  const longParagraphs = paragraphs.filter(p => p.length > 50)
  
  if (longParagraphs.length > 0) {
    const paragraphText = longParagraphs.slice(0, 5).join(' ')
    console.log(`✅ Using paragraph fallback: ${paragraphText.length} chars`)
    return paragraphText
  }
  
  // Last resort: get body text
  console.log('🔍 Using body text as last resort...')
  const bodyText = $('body').text()
  console.log(`✅ Body text length: ${bodyText.length} chars`)
  return bodyText
}

export async function GET() {
  try {
    // Test with a simple HTML structure
    const testHTML = `
      <html>
        <head><title>Test Article</title></head>
        <body>
          <header>Header content</header>
          <nav>Navigation</nav>
          <main>
            <article>
              <h1>Test Article Title</h1>
              <div class="article-content">
                <p>This is the first paragraph of the test article. It contains some meaningful content that should be extracted by our summarizer.</p>
                <p>This is the second paragraph with more content. The summarizer should be able to extract this text and create a summary from it.</p>
                <p>And here is a third paragraph to make sure we have enough content for a proper summary generation.</p>
              </div>
            </article>
          </main>
          <footer>Footer content</footer>
          <script>console.log('test');</script>
        </body>
      </html>
    `
    
    const $ = cheerio.load(testHTML)
    const extractedText = extractContent($, 'test-url')
    
    return NextResponse.json({
      success: true,
      extractedText: extractedText.substring(0, 200) + '...',
      textLength: extractedText.length,
      message: 'Content extraction test completed successfully'
    })
    
  } catch (error) {
    console.error('Debug endpoint error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
} 
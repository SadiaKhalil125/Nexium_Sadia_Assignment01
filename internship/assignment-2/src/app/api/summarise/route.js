import { NextResponse } from 'next/server'
import axios from 'axios'
import * as cheerio from 'cheerio'

// Enhanced dictionary for better translation
const dictionary = {
  this: 'یہ', 
  blog: 'بلاگ', 
  is: 'ہے', 
  about: 'کے بارے میں',
  tech: 'ٹیکنالوجی', 
  and: 'اور', 
  more: 'مزید',
  the: 'یہ',
  a: 'ایک',
  an: 'ایک',
  in: 'میں',
  on: 'پر',
  at: 'پر',
  to: 'کو',
  for: 'کے لیے',
  with: 'کے ساتھ',
  by: 'کی طرف سے',
  from: 'سے',
  of: 'کا',
  that: 'وہ',
  it: 'یہ',
  as: 'جیسا',
  be: 'ہونا',
  have: 'ہونا',
  do: 'کرنا',
  say: 'کہنا',
  get: 'حاصل کرنا',
  make: 'بنانا',
  go: 'جانا',
  know: 'جاننا',
  take: 'لینا',
  see: 'دیکھنا',
  come: 'آنا',
  think: 'سوچنا',
  look: 'دیکھنا',
  want: 'چاہنا',
  give: 'دینا',
  use: 'استعمال کرنا',
  find: 'تلاش کرنا',
  tell: 'بتانا',
  ask: 'پوچھنا',
  work: 'کام',
  seem: 'لگنا',
  feel: 'محسوس کرنا',
  try: 'کوشش کرنا',
  leave: 'چھوڑنا',
  call: 'بلانا',
  good: 'اچھا',
  new: 'نیا',
  first: 'پہلا',
  last: 'آخری',
  long: 'لمبا',
  great: 'عظیم',
  little: 'چھوٹا',
  own: 'اپنا',
  other: 'دوسرا',
  old: 'پرانا',
  right: 'درست',
  big: 'بڑا',
  high: 'اونچا',
  different: 'مختلف',
  small: 'چھوٹا',
  large: 'بڑا',
  next: 'اگلا',
  early: 'جلدی',
  young: 'جوان',
  important: 'اہم',
  few: 'کچھ',
  public: 'عوامی',
  bad: 'برا',
  same: 'ایک جیسا',
  able: 'قابل',
  above: 'اوپر',
  across: 'پار',
  after: 'بعد',
  against: 'خلاف',
  among: 'درمیان',
  before: 'پہلے',
  below: 'نیچے',
  between: 'درمیان',
  during: 'دوران',
  except: 'سوائے',
  into: 'میں',
  like: 'جیسا',
  near: 'قریب',
  off: 'بند',
  over: 'اوپر',
  through: 'کے ذریعے',
  under: 'نیچے',
  up: 'اوپر',
  down: 'نیچے',
  out: 'باہر',
  very: 'بہت',
  also: 'بھی',
  even: 'بھی',
  just: 'صرف',
  much: 'زیادہ',
  only: 'صرف',
  quite: 'کافی',
  rather: 'بلکہ',
  really: 'واقعی',
  so: 'تو',
  still: 'ابھی بھی',
  too: 'بھی',
  well: 'اچھا',
  almost: 'تقریباً',
  enough: 'کافی',
  far: 'دور',
  here: 'یہاں',
  there: 'وہاں',
  where: 'کہاں',
  when: 'کب',
  why: 'کیوں',
  how: 'کیسے',
  what: 'کیا',
  who: 'کون',
  which: 'کون سا',
  all: 'سب',
  any: 'کوئی',
  both: 'دونوں',
  each: 'ہر ایک',
  few: 'کچھ',
  more: 'زیادہ',
  most: 'سب سے زیادہ',
  no: 'نہیں',
  some: 'کچھ',
  such: 'ایسا',
  yes: 'ہاں',
  now: 'اب',
  then: 'پھر',
  today: 'آج',
  tomorrow: 'کل',
  yesterday: 'کل',
  always: 'ہمیشہ',
  never: 'کبھی نہیں',
  often: 'اکثر',
  sometimes: 'کبھی کبھی',
  usually: 'عام طور پر'
}

const summarise = (text) => {
  // Clean text first
  const cleaned = text.replace(/\s+/g, ' ').trim()
  
  // Split into sentences and take first 2-3 meaningful sentences
  const sentences = cleaned.split(/[.!?]+/).filter(s => s.trim().length > 20)
  const summary = sentences.slice(0, 3).join('. ').trim()
  
  return summary + (summary.endsWith('.') ? '' : '.')
}

const translate = (text) => {
  // Simple word-by-word translation with fallback
  return text.split(' ').map(word => {
    const cleanWord = word.toLowerCase().replace(/[^\w]/g, '')
    return dictionary[cleanWord] || word
  }).join(' ')
}

const extractContent = ($, url) => {
  console.log('🔍 Starting content extraction for:', url)
  
  // Remove unwanted elements
  $('script, style, nav, header, footer, .sidebar, .advertisement, .ads, .social-share, .comments, .related-posts, .newsletter, .popup, .modal, .cookie-banner, .ad-banner, .navigation, .menu, .breadcrumb, .pagination, .author-bio, .share-buttons, .tags, .categories, .meta, .date, .time, .author, .published, .updated, .reading-time, .word-count, .social-media, .newsletter-signup, .related-articles, .trending, .popular, .recommended').remove()
  
  // Site-specific selectors
  const siteSpecificSelectors = {
    'techcrunch.com': [
      '.article-content',
      '.entry-content',
      '.post-content',
      'article .content',
      '.article-body',
      '.story-body',
      '.post-body',
      '.entry-text',
      '.article-text',
      '.content',
      'article',
      '.article',
      '.story'
    ],
    'medium.com': [
      '.story-content',
      '.post-content',
      '.entry-content',
      'article .content',
      '.article-body'
    ],
    'wired.com': [
      '.article__content',
      '.entry-content',
      '.post-content',
      'article .content'
    ],
    'theverge.com': [
      '.entry-content',
      '.post-content',
      'article .content',
      '.article-body'
    ]
  }
  
  // Get domain for site-specific selectors
  const domain = new URL(url).hostname.replace('www.', '')
  const siteSelectors = siteSpecificSelectors[domain] || []
  
  // Try multiple selectors for article content
  const selectors = [
    ...siteSelectors,
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

const fetchWithFallback = async (url) => {
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  ]
  
  const headers = [
    {
      'User-Agent': userAgents[0],
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    },
    {
      'User-Agent': userAgents[1],
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate',
      'Connection': 'keep-alive'
    },
    {
      'User-Agent': userAgents[2],
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    }
  ]
  
  for (let i = 0; i < headers.length; i++) {
    try {
      console.log(`🌐 Attempt ${i + 1} with headers set ${i + 1}`)
      const response = await axios.get(url, {
        headers: headers[i],
        timeout: 15000,
        maxRedirects: 5,
        validateStatus: function (status) {
          return status >= 200 && status < 400
        }
      })
      
      console.log(`✅ Success on attempt ${i + 1}, status: ${response.status}`)
      return response
    } catch (error) {
      console.log(`❌ Attempt ${i + 1} failed:`, error.message)
      if (i === headers.length - 1) {
        throw error
      }
    }
  }
}

export async function POST(req) {
  try {
    const { url } = await req.json()
    
    console.log('🚀 Starting summarization for URL:', url)
    
    if (!url || !url.startsWith('http')) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    // Try fetching with different approaches
    let response
    try {
      response = await fetchWithFallback(url)
    } catch (error) {
      console.error('❌ All fetch attempts failed:', error.message)
      throw error
    }

    console.log('✅ Successfully fetched URL, status:', response.status)
    console.log('📄 HTML length:', response.data.length)

    const $ = cheerio.load(response.data)
    
    // Extract content using our improved function
    let text = extractContent($, url)

    // Clean the extracted text
    text = text
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .replace(/\t+/g, ' ') // Replace tabs with spaces
      .trim()
    
    console.log('🧹 Cleaned text length:', text.length)
    
    if (!text || text.length < 100) {
      console.log('❌ Text too short, returning error')
      return NextResponse.json(
        { error: 'Could not extract meaningful content from the page. This might be due to the website blocking automated requests or the content being behind a paywall.' },
        { status: 400 }
      )
    }

    console.log('📝 Generating summary...')
    const summary = summarise(text)
    console.log('🌐 Translating to Urdu...')
    const urdu = translate(summary)

    console.log('✅ Summary generated successfully')
    console.log('📊 Summary length:', summary.length)
    console.log('🌐 Urdu translation length:', urdu.length)

    // Return response without database operations for now
    return NextResponse.json({ 
      summary, 
      urdu,
      metadata: {
        source: url,
        length: text.length,
        sentences: summary.split('.').length - 1
      }
    })

  } catch (err) {
    console.error('❌ API Error:', err)
    console.error('❌ Error details:', {
      message: err.message,
      code: err.code,
      response: err.response?.status,
      responseData: err.response?.data
    })
    
    let errorMessage = 'An unexpected error occurred'
    
    if (err.response) {
      if (err.response.status === 404) {
        errorMessage = 'Page not found. Please check the URL.'
      } else if (err.response.status === 403) {
        errorMessage = 'Access denied. This website may block automated requests.'
      } else if (err.response.status === 429) {
        errorMessage = 'Too many requests. Please try again later.'
      } else if (err.response.status >= 500) {
        errorMessage = 'The website is currently unavailable. Please try again later.'
      } else {
        errorMessage = `Website returned ${err.response.status} status code.`
      }
    } else if (err.code === 'ECONNABORTED') {
      errorMessage = 'Request timed out. Please try again.'
    } else if (err.code === 'ENOTFOUND') {
      errorMessage = 'Could not find the website. Please check the URL.'
    } else if (err.code === 'ECONNREFUSED') {
      errorMessage = 'Connection refused. The website may be down.'
    } else if (err.message) {
      errorMessage = err.message
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
import { type NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import { generateOneTimeLinkEmail } from '@/lib/email-templates'
import pool from '@/config/database'

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds
const MAX_EMAILS_PER_IP = 10 // Maximum emails per IP per hour

// Store IP addresses and their email counts (in production, use Redis or similar)
const ipRequestCounts = new Map<string, { count: number; timestamp: number }>()

export async function POST(req: NextRequest) {
  try {
    // Get client IP
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    
    // Check rate limit
    const now = Date.now()
    const ipData = ipRequestCounts.get(ip)
    
    if (ipData) {
      // Reset count if window has passed
      if (now - ipData.timestamp > RATE_LIMIT_WINDOW) {
        ipRequestCounts.set(ip, { count: 1, timestamp: now })
      } else if (ipData.count >= MAX_EMAILS_PER_IP) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        )
      } else {
        ipRequestCounts.set(ip, { count: ipData.count + 1, timestamp: ipData.timestamp })
      }
    } else {
      ipRequestCounts.set(ip, { count: 1, timestamp: now })
    }

    const { email, link } = await req.json()

    if (!email || !link) {
      return NextResponse.json({ error: 'Email and link are required' }, { status: 400 })
    }

    // Validate that the link ID exists in our database
    const linkId = link.split('/').pop()
    const linkCheck = await pool.query(
      'SELECT id FROM one_time_links WHERE id = $1 AND NOT downloaded AND expires_at > NOW()',
      [linkId]
    )

    if (linkCheck.rows.length === 0) {
      return NextResponse.json({ error: 'Invalid or expired link' }, { status: 400 })
    }

    // Validate that the email matches the one in the database
    const emailCheck = await pool.query(
      'SELECT email_to FROM one_time_links WHERE id = $1 AND email_to = $2',
      [linkId, email]
    )

    if (emailCheck.rows.length === 0) {
      return NextResponse.json(
        { error: 'Email address does not match the link' },
        { status: 403 }
      )
    }

    await sendEmail(
      email,
      'Your One-Time Link',
      generateOneTimeLinkEmail(link)
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
} 
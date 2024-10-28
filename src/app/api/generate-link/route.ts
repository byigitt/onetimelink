'use server'

import { type NextRequest, NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { v4 as uuidv4 } from 'uuid'
import { saveData } from '@/lib/storage'
import { sendEmail } from '@/lib/email'
import { generateOneTimeLinkEmail } from '@/lib/email-templates'

const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024 // Default to 10MB if not set

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const content = formData.get('content') as string
    const file = formData.get('file') as File | null
    const email = formData.get('email') as string | null

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    let fileBuffer: Buffer | undefined
    let fileName: string | undefined
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ 
          error: `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit` 
        }, { status: 400 })
      }
      fileBuffer = Buffer.from(await file.arrayBuffer())
      fileName = file.name
    }

    const id = uuidv4()
    const encryptionKey = crypto.randomBytes(32)
    const iv = crypto.randomBytes(16)

    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv)
    let encryptedContent = cipher.update(content, 'utf8', 'hex')
    encryptedContent += cipher.final('hex')

    await saveData(id, {
      content: encryptedContent,
      file: fileBuffer ? fileBuffer.toString('base64') : undefined,
      fileName,
      createdAt: Date.now(),
      encryptionKey: encryptionKey.toString('hex'),
      iv: iv.toString('hex')
    })

    console.log(`Link generated: ${id}`)

    const link = `${process.env.NEXT_PUBLIC_BASE_URL}/access/${id}`

    // If email is provided, send the link
    if (email) {
      await sendEmail(
        email,
        'Your One-Time Link',
        generateOneTimeLinkEmail(link)
      )
    }

    return NextResponse.json({ link })
  } catch (error) {
    console.error('Error generating link:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

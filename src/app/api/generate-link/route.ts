'use server'

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

// This is a placeholder for the actual database integration
const tempStorage: { [key: string]: { content: string, file?: Buffer } } = {}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const content = formData.get('content') as string
    const file = formData.get('file') as File | null

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    let fileBuffer: Buffer | undefined
    if (file) {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        return NextResponse.json({ error: 'File size exceeds 100MB limit' }, { status: 400 })
      }
      fileBuffer = Buffer.from(await file.arrayBuffer())
    }

    const id = uuidv4()
    const encryptionKey = crypto.randomBytes(32)
    const iv = crypto.randomBytes(16)

    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv)
    let encryptedContent = cipher.update(content, 'utf8', 'hex')
    encryptedContent += cipher.final('hex')

    tempStorage[id] = {
      content: encryptedContent,
      file: fileBuffer,
    }

    // In a real implementation, you would store this in a database
    // along with the IV, and set an expiration time

    const link = `${process.env.NEXT_PUBLIC_BASE_URL}/access/${id}`

    return NextResponse.json({ link })
  } catch (error) {
    console.error('Error generating link:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

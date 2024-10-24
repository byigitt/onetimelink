'use server'

import { type NextRequest, NextResponse } from 'next/server'
import crypto from 'node:crypto'

// This is a placeholder for the actual database integration
const tempStorage: { [key: string]: { content: string, file?: Buffer } } = {}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id

  if (!tempStorage[id]) {
    return NextResponse.json({ error: 'Content not found or already accessed' }, { status: 404 })
  }

  const { content, file } = tempStorage[id]

  // In a real implementation, you would retrieve the encryption key and IV from the database
  const encryptionKey = crypto.randomBytes(32)
  const iv = crypto.randomBytes(16)

  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv)
  let decryptedContent = decipher.update(content, 'hex', 'utf8')
  decryptedContent += decipher.final('utf8')

  // Delete the content after accessing
  delete tempStorage[id]

  let fileUrl = null
  if (file) {
    // In a real implementation, you would generate a temporary URL for the file
    fileUrl = '/api/download/' + id
  }

  return NextResponse.json({ content: decryptedContent, fileUrl })
}

'use server'

import { type NextRequest, NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { getData, deleteData } from '@/lib/storage'

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const id = params.id

  console.log(`Accessing content for id: ${id}`)

  const data = await getData(id)

  if (!data) {
    console.log(`Content not found for id: ${id}`)
    return NextResponse.json({ error: 'Content not found or already accessed' }, { status: 404 })
  }

  const { content, file, fileName, createdAt, encryptionKey, iv } = data

  // Check if the content has expired (24 hours)
  if (Date.now() - createdAt > 24 * 60 * 60 * 1000) {
    console.log(`Content expired for id: ${id}`)
    await deleteData(id)
    return NextResponse.json({ error: 'Content has expired' }, { status: 410 })
  }

  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'hex'), Buffer.from(iv, 'hex'))
  let decryptedContent = decipher.update(content, 'hex', 'utf8')
  decryptedContent += decipher.final('utf8')

  let fileUrl = null
  if (file) {
    fileUrl = `/api/download/${id}`
  }

  console.log(`Content accessed for id: ${id}`)

  return NextResponse.json({ content: decryptedContent, fileUrl, fileName })
}

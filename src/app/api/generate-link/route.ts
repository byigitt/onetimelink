'use server'

import { type NextRequest, NextResponse } from 'next/server'
import pool from '@/config/database'
import { storeFile } from '@/lib/storage'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const content = formData.get('content') as string
    const file = formData.get('file') as File | null
    const email = formData.get('email') as string | null

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    let fileKey: string | undefined
    let fileName: string | undefined
    if (file) {
      const fileBuffer = Buffer.from(await file.arrayBuffer())
      fileKey = await storeFile(fileBuffer, file.name)
      fileName = file.name
    }

    const result = await pool.query(
      `INSERT INTO one_time_links (
        content, file_key, file_name, email_to, expires_at
      ) VALUES ($1, $2, $3, $4, NOW() + INTERVAL '24 hours')
      RETURNING id`,
      [content, fileKey, fileName, email]
    )

    return NextResponse.json({ id: result.rows[0].id })
  } catch (error) {
    console.error('Error generating link:', error)
    return NextResponse.json({ error: 'Failed to generate link' }, { status: 500 })
  }
}

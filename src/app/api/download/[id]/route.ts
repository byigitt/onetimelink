'use server'

import { type NextRequest, NextResponse } from 'next/server'
import pool from '@/config/database'
import { retrieveFile } from '@/lib/storage'

export async function GET(req: NextRequest, props: { params: { id: string } }) {
  const id = props.params.id

  console.log(`Downloading file for id: ${id}`)

  try {
    // Get file from database and mark as downloaded
    const result = await pool.query(
      `UPDATE one_time_links 
       SET downloaded = true, download_count = download_count + 1
       WHERE id = $1 
       AND NOT downloaded 
       AND expires_at > NOW()
       RETURNING file_name, file_key`,
      [id]
    );

    if (result.rows.length === 0) {
      console.log(`File not found or expired for id: ${id}`)
      return new NextResponse('File not found or link expired', { status: 404 })
    }

    const { file_key } = result.rows[0]
    
    // Retrieve file from S3
    const { buffer, fileName } = await retrieveFile(file_key)

    console.log(`File downloaded for id: ${id}`)

    return new NextResponse(buffer, {
      headers: {
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Type': 'application/octet-stream',
      },
    })
  } catch (error) {
    console.error('Error downloading file:', error)
    return new NextResponse('Server error', { status: 500 })
  }
}

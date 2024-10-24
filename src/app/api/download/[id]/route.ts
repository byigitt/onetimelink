import { type NextRequest, NextResponse } from 'next/server'
import { getData, deleteData } from '@/lib/storage'

export async function GET(req: NextRequest, props: { params: { id: string } }) {
  const id = props.params.id

  console.log(`Downloading file for id: ${id}`)

  const data = await getData(id)

  if (!data || !data.file) {
    console.log(`File not found for id: ${id}`)
    return new NextResponse('File not found', { status: 404 })
  }

  const { file, fileName } = data

  console.log(`File downloaded for id: ${id}`)

  // Delete the content immediately after downloading
  await deleteData(id)

  return new NextResponse(Buffer.from(file, 'base64'), {
    headers: {
      'Content-Disposition': `attachment; filename="${fileName || 'download'}"`,
      'Content-Type': 'application/octet-stream',
    },
  })
}

import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function storeFile(fileBuffer: Buffer, fileName: string) {
  const key = `${Date.now()}-${fileName}`
  
  await s3Client.send(new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ContentType: 'application/octet-stream',
  }))
  
  return key
}

export async function retrieveFile(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  })
  
  const response = await s3Client.send(command)
  const arrayBuffer = await response.Body?.transformToByteArray()
  
  if (!arrayBuffer) {
    throw new Error('File not found')
  }
  
  return { 
    buffer: Buffer.from(arrayBuffer), 
    fileName: key.split('-').slice(1).join('-') 
  }
}

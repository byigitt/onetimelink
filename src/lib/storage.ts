import fs from 'node:fs/promises'
import path from 'node:path'

const storagePath = path.join(process.cwd(), 'temp-storage.json')

interface StorageData {
  content: string
  file?: string
  fileName?: string
  createdAt: number
  encryptionKey: string
  iv: string
}

export async function saveData(id: string, data: StorageData): Promise<void> {
  let storage: Record<string, StorageData> = {}
  try {
    const content = await fs.readFile(storagePath, 'utf-8')
    storage = JSON.parse(content)
  } catch (error: unknown) {
    // File doesn't exist yet, that's okay
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error('Error reading storage file:', error)
    }
  }
  storage[id] = data
  await fs.writeFile(storagePath, JSON.stringify(storage))
}

export async function getData(id: string): Promise<StorageData | null> {
  try {
    const content = await fs.readFile(storagePath, 'utf-8')
    const storage: Record<string, StorageData> = JSON.parse(content)
    return storage[id] || null
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error('Error reading storage file:', error)
    }
    return null
  }
}

export async function deleteData(id: string): Promise<void> {
  try {
    const content = await fs.readFile(storagePath, 'utf-8')
    const storage: Record<string, StorageData> = JSON.parse(content)
    delete storage[id]
    await fs.writeFile(storagePath, JSON.stringify(storage))
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error('Error deleting data:', error)
    }
  }
}

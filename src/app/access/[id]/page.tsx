'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, FileDown, File } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AccessPage() {
  const { id } = useParams()
  const [content, setContent] = useState<string | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch(`/api/access/${id}`)
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to fetch content')
        }
        const data = await response.json()
        setContent(data.content)
        if (data.fileUrl) {
          setFileUrl(data.fileUrl)
          setFileName(data.fileName || 'download')
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'This link has expired or is invalid.'
        setError(errorMessage)
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [id, toast])

  const handleDownload = async () => {
    if (fileUrl) {
      setIsDownloading(true)
      try {
        const response = await fetch(fileUrl)
        if (!response.ok) throw new Error('Download failed')
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = fileName || 'download'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Failed to download the file. Please try again."
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
      } finally {
        setIsDownloading(false)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Loader2 className="h-8 w-8 animate-spin" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <AnimatePresence mode="wait">
        {error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full max-w-sm sm:max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Error</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base">{error}</p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Shared Content</CardTitle>
                <CardDescription className="text-sm">This content will be deleted after viewing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {content && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="font-semibold leading-none tracking-tight text-base mb-2">Content</h3>
                    <p className="whitespace-pre-wrap bg-muted p-3 sm:p-4 text-xs sm:text-sm rounded-md">{content}</p>
                  </motion.div>
                )}
                {fileUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="font-semibold leading-none tracking-tight text-base mb-2">Attached File</h3>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 bg-muted p-3 sm:p-4 rounded-md">
                      <div className="flex items-center space-x-2 flex-grow">
                        <File className="h-4 w-4 flex-shrink-0" />
                        <span className="text-xs sm:text-sm truncate">{fileName}</span>
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={handleDownload} disabled={isDownloading} size="sm">
                          {isDownloading ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <FileDown className="h-4 w-4 mr-2" />
                          )}
                          {isDownloading ? 'Downloading...' : 'Download'}
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
              <CardFooter>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Warning: This content will be deleted after you leave this page.
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

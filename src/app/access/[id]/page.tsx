'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function AccessPage() {
  const { id } = useParams()
  const [content, setContent] = useState<string | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch(`/api/access/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch content')
        }
        const data = await response.json()
        setContent(data.content)
        if (data.fileUrl) {
          setFileUrl(data.fileUrl)
        }
      } catch (error) {
        setError('This link has expired or is invalid.')
        toast({
          title: "Error",
          description: "This link has expired or is invalid.",
          variant: "destructive",
        })
      }
    }

    fetchContent()
  }, [id, toast])

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Shared Content</CardTitle>
          <CardDescription>This content will be deleted after viewing</CardDescription>
        </CardHeader>
        <CardContent>
          {content && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Content:</h3>
              <p className="whitespace-pre-wrap">{content}</p>
            </div>
          )}
          {fileUrl && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Attached File:</h3>
              <Button asChild>
                <a href={fileUrl} download>Download File</a>
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Warning: This content will be deleted after you leave this page.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

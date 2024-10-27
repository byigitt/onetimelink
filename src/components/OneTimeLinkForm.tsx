'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Copy, Link as LinkIcon, Check, FileText, Mail } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'

const formSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  file: z.instanceof(File).optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
})

export default function OneTimeLinkForm() {
  const [generatedLink, setGeneratedLink] = useState('')
  const [sharedContent, setSharedContent] = useState('')
  const [sharedFileName, setSharedFileName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      email: '',
      file: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('content', values.content)
      if (values.file) {
        formData.append('file', values.file)
      }
      if (values.email) {
        formData.append('email', values.email)
      }

      const response = await fetch('/api/generate-link', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to generate link')
      }

      const data = await response.json()
      setGeneratedLink(data.link)
      setSharedContent(values.content)
      setSharedFileName(values.file?.name || null)

      if (values.email) {
        toast({
          title: "Email Sent",
          description: "The link has been sent to the provided email address.",
        })
      }
    } catch (error) {
      console.error('Error generating link:', error)
      toast({
        title: "Error",
        description: "Failed to generate link. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink)
    setIsCopied(true)
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    })
    setTimeout(() => setIsCopied(false), 2000) // Reset after 2 seconds
  }

  return (
    <AnimatePresence mode="wait">
      {generatedLink ? (
        <motion.div
          key="generated-link"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Link Generated</CardTitle>
              <CardDescription>Your one-time link has been created</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div
                className="flex items-center space-x-2"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <Input value={generatedLink} readOnly />
                <Button onClick={copyToClipboard} size="icon">
                  <AnimatePresence mode="wait">
                    {isCopied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check className="h-4 w-4 text-green-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Copy className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                This link will expire after 24 hours or after the first access.
              </p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shared Content</CardTitle>
              <CardDescription>Preview of the shared information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Content:</h3>
                  <p className="text-sm bg-muted p-2 rounded-md whitespace-pre-wrap">{sharedContent}</p>
                </div>
                {sharedFileName && (
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">{sharedFileName}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your sensitive information here" {...field} />
                    </FormControl>
                    <FormDescription>
                      This content will be encrypted and shared via a one-time link.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        onChange={(e) => field.onChange(e.target.files?.[0])} 
                      />
                    </FormControl>
                    <FormDescription>
                      Upload a file (max 100MB) to be shared securely.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type="email"
                          placeholder="recipient@example.com"
                          className="pl-8"
                          {...field}
                        />
                        <Mail className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormDescription>
                      The one-time link will be sent to this email address if provided.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Generate Link
                  </>
                )}
              </Button>
            </form>
          </Form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

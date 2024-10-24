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

const formSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  file: z.instanceof(File).optional(),
})

export default function OneTimeLinkForm() {
  const [generatedLink, setGeneratedLink] = useState('')
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData()
      formData.append('content', values.content)
      if (values.file) {
        formData.append('file', values.file)
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
    } catch (error) {
      console.error('Error generating link:', error)
      toast({
        title: "Error",
        description: "Failed to generate link. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormLabel>File (optional)</FormLabel>
              <FormControl>
                <Input type="file" onChange={(e) => field.onChange(e.target.files?.[0])} />
              </FormControl>
              <FormDescription>
                Upload a file (max 100MB) to be shared securely.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Generate Link</Button>
      </form>
      {generatedLink && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Generated Link:</h3>
          <p className="break-all">{generatedLink}</p>
        </div>
      )}
    </Form>
  )
}

'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-sm sm:max-w-md lg:max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">About One Time Link</CardTitle>
          <CardDescription className="text-sm sm:text-base">Secure, one-time sharing of sensitive information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm sm:text-base">
          <p>
            One Time Link is a web-based application designed for secure, one-time sharing of sensitive information via self-destructive links. Our service allows users to upload text or files (up to 100MB) and generate an encrypted link without requiring account registration.
          </p>
          <p>
            Key features:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>No account required</li>
            <li>End-to-end encryption</li>
            <li>Self-destructing links</li>
            <li>File uploads up to 100MB</li>
            <li>Automatic data removal after 24 hours or first access</li>
          </ul>
          <p>
            Our mission is to provide a simple, secure way to share sensitive information without the risk of unauthorized access or data breaches.
          </p>
        </CardContent>
        <CardFooter>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

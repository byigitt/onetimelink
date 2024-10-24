'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import OneTimeLinkForm from '@/components/OneTimeLinkForm'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>One Time Link</CardTitle>
          <CardDescription>Share sensitive information securely</CardDescription>
        </CardHeader>
        <CardContent>
          <OneTimeLinkForm />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/about">
            <Button variant="outline">About</Button>
          </Link>
          <Link href="/privacy">
            <Button variant="outline">Privacy Policy</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import OneTimeLinkForm from '@/components/OneTimeLinkForm'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">One Time Link</CardTitle>
          <CardDescription className="text-sm sm:text-base">Share sensitive information securely</CardDescription>
        </CardHeader>
        <CardContent>
          <OneTimeLinkForm />
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <Link href="/about">
            <Button variant="outline" size="sm">About</Button>
          </Link>
          <Link href="/privacy">
            <Button variant="outline" size="sm">Privacy Policy</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

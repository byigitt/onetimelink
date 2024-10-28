'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-sm sm:max-w-md lg:max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">Privacy Policy</CardTitle>
          <CardDescription className="text-sm sm:text-base">How we handle your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm sm:text-base">
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">1. Information Collection</h2>
            <p>
              We only collect the information you provide when using our service, which includes the content you wish to share and any uploaded files. We do not collect any personal information or tracking data.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">2. Use of Information</h2>
            <p>
              The information you provide is used solely for the purpose of creating and sharing one-time links. We do not use this information for any other purpose.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">3. Data Storage and Security</h2>
            <p>
              All data is encrypted using AES-256 encryption. We store only the encrypted data, which is automatically deleted after 24 hours or immediately after the link is accessed, whichever comes first.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">4. Third-Party Services</h2>
            <p>
              We do not use any third-party services or analytics tools that would have access to your data.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">5. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
          </section>
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

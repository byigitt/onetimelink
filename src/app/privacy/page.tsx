import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
          <CardDescription>How we handle your data</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">1. Information Collection</h2>
          <p className="mb-4">
            We only collect the information you provide when using our service, which includes the content you wish to share and any uploaded files. We do not collect any personal information or tracking data.
          </p>

          <h2 className="text-xl font-semibold mb-2">2. Use of Information</h2>
          <p className="mb-4">
            The information you provide is used solely for the purpose of creating and sharing one-time links. We do not use this information for any other purpose.
          </p>

          <h2 className="text-xl font-semibold mb-2">3. Data Storage and Security</h2>
          <p className="mb-4">
            All data is encrypted using AES-256 encryption. We store only the encrypted data, which is automatically deleted after 24 hours or immediately after the link is accessed, whichever comes first.
          </p>

          <h2 className="text-xl font-semibold mb-2">4. Third-Party Access</h2>
          <p className="mb-4">
            We do not share any information with third parties. The data you provide is only accessible through the one-time link you create.
          </p>

          <h2 className="text-xl font-semibold mb-2">5. Changes to This Policy</h2>
          <p className="mb-4">
            We may update this privacy policy from time to time. We will notify users of any changes by posting the new privacy policy on this page.
          </p>

          <h2 className="text-xl font-semibold mb-2">6. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact us at privacy@onetimelink.com.
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

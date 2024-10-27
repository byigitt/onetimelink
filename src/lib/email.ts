import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailProps {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailProps) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not defined')
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'One Time Link <onetime@link.com>',
      to,
      subject,
      html,
    })

    if (error) {
      console.error('Failed to send email:', error)
      throw new Error('Failed to send email')
    }

    return data
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

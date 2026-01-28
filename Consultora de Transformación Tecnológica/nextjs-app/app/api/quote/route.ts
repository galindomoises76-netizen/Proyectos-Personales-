import { NextRequest, NextResponse } from 'next/server'
import { saveQuoteRequest } from '@/lib/db'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    const required = ['name', 'company', 'email', 'phone', 'serviceType', 'projectDescription']
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Insert into database
    const result = await saveQuoteRequest({
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      industry: data.industry || undefined,
      serviceType: data.serviceType,
      projectDescription: data.projectDescription,
      budgetRange: data.budgetRange || undefined,
    })

    // Send emails (non-blocking)
    sendEmails(data).catch(console.error)

    return NextResponse.json({
      success: true,
      message: 'Quote request submitted successfully. We\'ll contact you soon!',
      id: result.id,
    })
  } catch (error) {
    console.error('Quote request error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred while processing your request.' },
      { status: 500 }
    )
  }
}

async function sendEmails(data: any) {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@aiconsultancy.com'
  const smtpConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  }

  // Only send emails if SMTP is configured
  if (!smtpConfig.auth.user || !smtpConfig.auth.pass) {
    console.log('SMTP not configured, skipping email notifications')
    return
  }

  const transporter = nodemailer.createTransport(smtpConfig)

  // Send notification to admin
  try {
    await transporter.sendMail({
      from: smtpConfig.auth.user,
      to: adminEmail,
      subject: `New Quote Request from ${data.name}`,
      text: `
New Quote Request Received

Name: ${data.name}
Company: ${data.company}
Email: ${data.email}
Phone: ${data.phone}
Industry: ${data.industry || 'Not specified'}
Service Type: ${data.serviceType}
Budget Range: ${data.budgetRange || 'Not specified'}

Project Description:
${data.projectDescription}

Please follow up with this lead as soon as possible.
      `,
    })
  } catch (error) {
    console.error('Failed to send admin notification:', error)
  }

  // Send confirmation to user
  try {
    await transporter.sendMail({
      from: smtpConfig.auth.user,
      to: data.email,
      subject: 'Thank you for your interest - AI Consultancy',
      text: `
Dear ${data.name},

Thank you for your interest in our AI automation services. 
We have received your quote request and our team will review it shortly.

We typically respond within 24-48 hours. If you have any urgent questions, 
please don't hesitate to reach out.

Best regards,
AI Consultancy Team
      `,
    })
  } catch (error) {
    console.error('Failed to send confirmation email:', error)
  }
}

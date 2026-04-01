import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_ZqQo32C4_rsuzV5pbm3TxA9x3hB4JCyPo');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { parentName, email, phone, childName, childDob, subject, message } = req.body;

  if (!parentName || !email || !phone || !childName || !childDob || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!resend) {
    console.error("RESEND_API_KEY is not set");
    return res.status(500).json({ error: "Email service not configured" });
  }

  try {
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Resend API connection timed out. Your connection to Resend might be blocked.')), 10000)
    );

    const { data, error } = await Promise.race([
      resend.emails.send({
        from: "onboarding@resend.dev", // Simplified 'from' address
        to: ["zahradaycare786@gmail.com"], // Updated recipient email
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Parent/Guardian Name:</strong> ${parentName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Child's Name:</strong> ${childName}</p>
          <p><strong>Child's Date of Birth:</strong> ${childDob}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${(message as string).replace(/\n/g, '<br>')}</p>
        `,
      }),
      timeoutPromise
    ]) as any;

    if (error) {
      console.error("Resend API Error:", JSON.stringify(error, null, 2));
      
      // Handle specific Resend validation errors
      if (error.name === 'validation_error') {
        return res.status(400).json({ 
          error: "Email validation failed. If you are using a Resend free account, you can only send emails to the address you signed up with until you verify your domain." 
        });
      }
      
      return res.status(400).json({ error: error.message || "Failed to send email" });
    }

    res.status(200).json({ message: "Email sent successfully", data });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

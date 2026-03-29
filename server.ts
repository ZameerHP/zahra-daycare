import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

  // API routes FIRST
  app.post("/api/send-email", async (req, res) => {
    const { parentName, email, phone, childName, childDob, subject, message } = req.body;

    if (!parentName || !email || !phone || !childName || !childDob || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!resend) {
      console.error("RESEND_API_KEY is not set");
      return res.status(500).json({ error: "Email service not configured" });
    }

    try {
      const { data, error } = await resend.emails.send({
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
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });

      if (error) {
        console.error("Resend API Error:", JSON.stringify(error, null, 2));
        
        // Handle specific Resend validation errors
        if (error.name === 'validation_error') {
          return res.status(400).json({ 
            error: "Email validation failed. If you are using a Resend free account, you can only send emails to the address you signed up with (likely zameerpanhwer67@gmail.com) until you verify your domain." 
          });
        }
        
        return res.status(400).json({ error: error.message || "Failed to send email" });
      }

      res.status(200).json({ message: "Email sent successfully", data });
    } catch (err) {
      console.error("Server error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

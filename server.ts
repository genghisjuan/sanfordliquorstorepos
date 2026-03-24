import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "8080");

  app.use(express.json());
  
  // CORS configuration
  const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : ["*"];
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  }));

  // API route for contact form
  app.post("/api/contact", async (req, res) => {
    const { fullName, businessName, phoneNumber, monthlyVolume } = req.body;

    // 1. Validate input
    if (!fullName || !businessName || !phoneNumber || !monthlyVolume) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 2. Configure Nodemailer
    const smtpConfig: any = {
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };

    // Use Gmail service optimization if host is Gmail
    if (process.env.SMTP_HOST?.includes("gmail.com")) {
      smtpConfig.service = "gmail";
      console.log("Using Gmail service optimization");
    } else {
      smtpConfig.host = process.env.SMTP_HOST;
      smtpConfig.port = parseInt(process.env.SMTP_PORT || "587");
      smtpConfig.secure = process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465";
      console.log("Using custom SMTP config:", {
        host: smtpConfig.host,
        port: smtpConfig.port,
        secure: smtpConfig.secure
      });
    }

    console.log("Auth details:", {
      user: process.env.SMTP_USER,
      passLength: process.env.SMTP_PASS?.length,
      hasPass: !!process.env.SMTP_PASS
    });

    const transporter = nodemailer.createTransport(smtpConfig);

    try {
      // 3. Send the email
      await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME || "Sanford POS Lead"}" <${process.env.EMAIL_FROM_ADDRESS || process.env.SMTP_USER}>`,
        to: process.env.INTERNAL_EMAIL_TO,
        replyTo: process.env.EMAIL_REPLY_TO,
        subject: `New Lead: ${businessName}`,
        text: `
          New Lead Received:
          
          Full Name: ${fullName}
          Business Name: ${businessName}
          Phone Number: ${phoneNumber}
          Monthly Volume: ${monthlyVolume}
        `,
        html: `
          <h3>New Lead Received</h3>
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Business Name:</strong> ${businessName}</p>
          <p><strong>Phone Number:</strong> ${phoneNumber}</p>
          <p><strong>Monthly Volume:</strong> ${monthlyVolume}</p>
        `,
      });

      console.log(`Email sent successfully for lead: ${businessName}`);
      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    console.log(`Serving static files from: ${distPath}`);
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port: ${PORT}`);
  });
}

startServer();

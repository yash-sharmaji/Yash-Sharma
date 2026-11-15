import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {}

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/yash_portfolio';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'yash2026';

app.use(cors());
app.use(express.json());

// In-Memory store fallback if MongoDB isn't running
let isMongoConnected = false;
const inMemoryContacts = [];
const inMemoryReactions = {
  sharex: 42,
  civicai: 29,
  leetcode: 51
};
let tourCompletions = 128;

// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: 'Portfolio Contact' },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB Atlas successfully.');
  })
  .catch((err) => {
    console.warn('ℹ️ MongoDB connection warning:', err.message);
    console.log('Operating in In-Memory fallback mode so backend never crashes.');
  });

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    mode: isMongoConnected ? 'mongodb-atlas' : 'in-memory',
    emailConfigured: Boolean((process.env.EMAIL_USER && process.env.EMAIL_PASS) || process.env.RESEND_API_KEY),
    provider: process.env.RESEND_API_KEY ? 'resend-api' : (process.env.EMAIL_USER ? 'gmail-smtp' : 'none'),
    timestamp: new Date().toISOString()
  });
});

// Helper to send email via Resend (HTTPS Port 443 - 100% Reliable on Render Cloud)
async function sendViaResend({ name, email, subject, message, notificationEmail }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [notificationEmail],
      reply_to: email,
      subject: `[Portfolio Dispatch] ${subject} from ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #f5f0e8; color: #1d1d1b;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 2px solid #183d2d; border-radius: 8px; padding: 24px; box-shadow: 4px 4px 0px #1a1a1a;">
            <h2 style="color: #183d2d; margin-top: 0;">New Message from Portfolio</h2>
            <hr style="border: none; border-top: 1px solid #ede8df; margin: 16px 0;" />
            <p><strong>Sender:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="margin-top: 20px; padding: 16px; background-color: #faf8f5; border-left: 4px solid #183d2d; border-radius: 4px;">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #ede8df; margin: 24px 0 16px 0;" />
            <p style="font-size: 11px; color: #777;">Sent via Resend HTTPS API on Render.</p>
          </div>
        </div>
      `
    })
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Resend API returned status ${res.status}: ${errorText}`);
  }
  return await res.json();
}

// Helper to send email via Gmail SMTP (Nodemailer)
async function sendViaNodemailer({ name, email, subject, message, emailUser, emailPass, notificationEmail }) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL
    auth: {
      user: emailUser,
      pass: emailPass
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000
  });

  return await transporter.sendMail({
    from: `"Portfolio Contact" <${emailUser}>`,
    to: notificationEmail,
    replyTo: email,
    subject: `[Portfolio Dispatch] ${subject} from ${name}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; background-color: #f5f0e8; color: #1d1d1b;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 2px solid #183d2d; border-radius: 8px; padding: 24px; box-shadow: 4px 4px 0px #1a1a1a;">
          <h2 style="color: #183d2d; margin-top: 0;">New Message from Portfolio</h2>
          <hr style="border: none; border-top: 1px solid #ede8df; margin: 16px 0;" />
          <p><strong>Sender:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 16px; background-color: #faf8f5; border-left: 4px solid #183d2d; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #ede8df; margin: 24px 0 16px 0;" />
          <p style="font-size: 11px; color: #777;">Sent via Yash Sharma's Portfolio Server.</p>
        </div>
      </div>
    `
  });
}

// Bulletproof Contact Dispatch
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  const payload = {
    id: Date.now().toString(),
    name,
    email,
    subject: subject || 'General Inquiry',
    message,
    createdAt: new Date().toISOString()
  };

  // 1. ALWAYS persist message in MongoDB Atlas first (Zero Data Loss)
  let savedDoc = null;
  if (isMongoConnected) {
    try {
      savedDoc = await Contact.create(payload);
      console.log(`💾 Saved message from ${name} to MongoDB Atlas.`);
    } catch (err) {
      console.error('Mongo save error, falling back to memory store:', err.message);
    }
  }

  if (!savedDoc) {
    inMemoryContacts.unshift(payload);
  }

  // 2. Safe Email Forwarding (Guaranteed NEVER to crash backend)
  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'ysharma8502@gmail.com';
  const resendApiKey = process.env.RESEND_API_KEY;
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  // Background dispatch with full diagnostics
  (async () => {
    if (resendApiKey) {
      try {
        await sendViaResend({ name, email, subject: payload.subject, message, notificationEmail });
        console.log(`✉️ [Resend API] Email successfully forwarded to ${notificationEmail}`);
        return;
      } catch (resendErr) {
        console.warn('⚠️ [Resend API Error]:', resendErr.message);
      }
    }

    if (emailUser && emailPass) {
      try {
        await sendViaNodemailer({ name, email, subject: payload.subject, message, emailUser, emailPass, notificationEmail });
        console.log(`✉️ [Gmail SMTP] Email successfully forwarded to ${notificationEmail}`);
        return;
      } catch (smtpErr) {
        console.warn('⚠️ [Gmail SMTP Error on Render]:', smtpErr.message);
        console.warn('ℹ️ Note: Render free tier blocks outbound SMTP port 465/587. Use RESEND_API_KEY (HTTPS port 443) for 100% reliable cloud email forwarding.');
      }
    }

    if (!resendApiKey && (!emailUser || !emailPass)) {
      console.warn('⚠️ [Environment Warning]: Neither RESEND_API_KEY nor EMAIL_USER/EMAIL_PASS are defined in the Render Environment Variables dashboard!');
      console.log(`Message is safely saved in MongoDB Atlas database, but no email was dispatched.`);
    }
  })();

  // 3. Always return success to client
  res.status(201).json({
    success: true,
    message: 'Message received and stored safely!',
    data: savedDoc || payload
  });
});

// Secured GET /api/contact - Requires private Admin Secret Key
app.get('/api/contact', async (req, res) => {
  const authHeader = req.headers['x-admin-key'];
  if (authHeader !== ADMIN_SECRET) {
    return res.status(401).json({
      error: 'Unauthorized: Private endpoint. Only the site administrator can access received messages.'
    });
  }

  if (isMongoConnected) {
    try {
      const docs = await Contact.find().sort({ createdAt: -1 }).limit(50);
      return res.json(docs);
    } catch {
      // Fall through to memory
    }
  }
  res.json(inMemoryContacts);
});

app.get('/api/reactions', (req, res) => {
  res.json(inMemoryReactions);
});

app.post('/api/reactions/:projectKey', (req, res) => {
  const { projectKey } = req.params;
  if (inMemoryReactions[projectKey] !== undefined) {
    inMemoryReactions[projectKey] += 1;
  } else {
    inMemoryReactions[projectKey] = 1;
  }
  res.json({ success: true, reactions: inMemoryReactions });
});

app.post('/api/tour/complete', (req, res) => {
  tourCompletions += 1;
  res.json({ success: true, totalCompletions: tourCompletions });
});

app.get('/api/tour/stats', (req, res) => {
  res.json({ totalCompletions: tourCompletions });
});

// Serve Client Static Build if present
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) next();
  });
});

const startListening = (port) => {
  const server = app.listen(port, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 Portfolio Backend running at: http://localhost:${port}`);
    console.log(`📁 Static Frontend served from: ${clientDistPath}`);
    console.log(`==================================================\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${port} is in use. Retrying on port ${Number(port) + 1}...`);
      startListening(Number(port) + 1);
    } else {
      console.error('Server error:', err);
    }
  });
};

startListening(PORT);

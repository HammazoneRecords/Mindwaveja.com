import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

const PRODUCTS = [
  'MindWave Phase Packs',
  'Patois Calibration Agent',
  'RAAS — Reggae As A Service',
  'Solobility Portal',
  'Marcus Garvey App',
  'Time-Check App',
  'General / MindWave Platform',
];

function getRatingStars(rating: number): string {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function getRatingLabel(rating: number): string {
  const labels: Record<number, string> = {
    1: 'Poor',
    2: 'Below Average',
    3: 'Average',
    4: 'Good',
    5: 'Excellent',
  };
  return labels[rating] ?? 'Unknown';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { product, rating, comment, name, email } = body;

    // Validate
    if (!product || !rating || !comment) {
      return NextResponse.json({ error: 'Product, rating, and comment are required.' }, { status: 400 });
    }
    if (!PRODUCTS.includes(product)) {
      return NextResponse.json({ error: 'Invalid product.' }, { status: 400 });
    }
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5.' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const submitterName = name?.trim() || 'Anonymous';
    const submitterEmail = email?.trim() || 'Not provided';

    // Log to file (append to feedback_log.jsonl in project root)
    try {
      const logPath = path.join(process.cwd(), 'feedback_log.jsonl');
      const entry = JSON.stringify({
        timestamp,
        product,
        rating,
        comment: comment.trim(),
        name: submitterName,
        email: submitterEmail,
      }) + '\n';
      fs.appendFileSync(logPath, entry, 'utf8');
    } catch {
      // Log failure is non-fatal — email still sends
      console.warn('Could not write to feedback_log.jsonl');
    }

    // Send email notification
    const notifyEmail = process.env.NOTIFY_EMAIL ?? 'ovandobrown@gmail.com';
    const fromEmail = process.env.EMAIL_FROM ?? 'onboarding@resend.dev';

    await resend.emails.send({
      from: fromEmail,
      to: notifyEmail,
      subject: `[Feedback] ${getRatingStars(rating)} — ${product}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:auto;padding:24px;background:#0a0a0a;border-radius:12px;border:1px solid #1a1a1a">
          <div style="margin-bottom:20px">
            <h2 style="color:#00e5ff;margin:0 0 4px 0;font-size:20px">New Feedback Received</h2>
            <p style="color:#666;margin:0;font-size:13px">${timestamp}</p>
          </div>

          <div style="background:#111;border-radius:8px;padding:16px;margin-bottom:16px">
            <p style="color:#888;font-size:12px;margin:0 0 4px 0;text-transform:uppercase;letter-spacing:1px">Product</p>
            <p style="color:#fff;font-size:16px;font-weight:600;margin:0">${product}</p>
          </div>

          <div style="background:#111;border-radius:8px;padding:16px;margin-bottom:16px">
            <p style="color:#888;font-size:12px;margin:0 0 4px 0;text-transform:uppercase;letter-spacing:1px">Rating</p>
            <p style="color:#ffd700;font-size:22px;margin:0 0 2px 0">${getRatingStars(rating)}</p>
            <p style="color:#aaa;font-size:13px;margin:0">${rating}/5 — ${getRatingLabel(rating)}</p>
          </div>

          <div style="background:#111;border-radius:8px;padding:16px;margin-bottom:16px">
            <p style="color:#888;font-size:12px;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:1px">Comment</p>
            <p style="color:#fff;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap">${comment.trim()}</p>
          </div>

          <div style="background:#111;border-radius:8px;padding:16px">
            <p style="color:#888;font-size:12px;margin:0 0 4px 0;text-transform:uppercase;letter-spacing:1px">From</p>
            <p style="color:#fff;font-size:14px;margin:0">${submitterName}</p>
            <p style="color:#666;font-size:13px;margin:4px 0 0 0">${submitterEmail}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Feedback API error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}

export async function GET() {
  // Simple read of the log file for admin use
  try {
    const logPath = path.join(process.cwd(), 'feedback_log.jsonl');
    if (!fs.existsSync(logPath)) {
      return NextResponse.json({ entries: [] });
    }
    const raw = fs.readFileSync(logPath, 'utf8');
    const entries = raw
      .trim()
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line))
      .reverse(); // newest first
    return NextResponse.json({ entries });
  } catch {
    return NextResponse.json({ error: 'Could not read feedback log.' }, { status: 500 });
  }
}

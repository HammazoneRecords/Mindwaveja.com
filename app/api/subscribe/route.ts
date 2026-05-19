import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SUBSCRIBERS_FILE = path.join(process.cwd(), 'data', 'subscribers.json');

function loadSubscribers(): string[] {
  try {
    if (!fs.existsSync(path.dirname(SUBSCRIBERS_FILE))) {
      fs.mkdirSync(path.dirname(SUBSCRIBERS_FILE), { recursive: true });
    }
    if (!fs.existsSync(SUBSCRIBERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function saveSubscribers(list: string[]) {
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(list, null, 2));
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const normalised = email.trim().toLowerCase();

    const subscribers = loadSubscribers();
    if (subscribers.includes(normalised)) {
      // Already subscribed — return success silently (don't leak list membership)
      return NextResponse.json({ ok: true });
    }

    subscribers.push(normalised);
    saveSubscribers(subscribers);

    // Optional: send Resend notification to owner
    const resendKey = process.env.RESEND_API_KEY || process.env.EARN_RESEND_API_KEY;
    if (resendKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'MindWave JA <noreply@mindwaveja.com>',
            to: ['ovandobrown@gmail.com'],
            subject: `New subscriber: ${normalised}`,
            text: `New email subscriber on mindwaveja.com\n\nEmail: ${normalised}\nTotal subscribers: ${subscribers.length}`,
          }),
        });
      } catch {
        // Notification failure is non-fatal — subscriber is already saved
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Subscribe error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const form = await req.formData();

    const name        = form.get('name') as string;
    const email       = form.get('email') as string;
    const whatsapp    = form.get('whatsapp') as string | null;
    const productName = form.get('productName') as string;
    const productPrice= form.get('productPrice') as string;
    const receipt     = form.get('receipt') as File | null;

    if (!name || !email || !productName) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Build email attachments
    const attachments: { filename: string; content: Buffer }[] = [];
    if (receipt) {
      const bytes = await receipt.arrayBuffer();
      attachments.push({
        filename: receipt.name || 'receipt',
        content: Buffer.from(bytes),
      });
    }

    const notifyEmail = process.env.NOTIFY_EMAIL ?? 'ovandobrown@gmail.com';
    const fromEmail   = process.env.EMAIL_FROM   ?? 'onboarding@resend.dev';

    await resend.emails.send({
      from: fromEmail,
      to: notifyEmail,
      subject: `New Reservation — ${productName}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:auto;padding:24px;background:#f9f9f9;border-radius:12px">
          <h2 style="color:#E94E52;margin-bottom:4px">New Reservation</h2>
          <p style="color:#555;margin-top:0">${productName} — <strong>${productPrice}</strong></p>
          <hr style="border:none;border-top:1px solid #ddd;margin:16px 0"/>
          <table style="width:100%;font-size:14px;color:#333">
            <tr><td style="padding:6px 0;color:#888">Name</td><td style="padding:6px 0;font-weight:600">${name}</td></tr>
            <tr><td style="padding:6px 0;color:#888">Email</td><td style="padding:6px 0">${email}</td></tr>
            <tr><td style="padding:6px 0;color:#888">WhatsApp</td><td style="padding:6px 0">${whatsapp || '—'}</td></tr>
            <tr><td style="padding:6px 0;color:#888">Product</td><td style="padding:6px 0">${productName}</td></tr>
            <tr><td style="padding:6px 0;color:#888">Amount</td><td style="padding:6px 0;font-weight:700;color:#E94E52">${productPrice}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #ddd;margin:16px 0"/>
          <p style="font-size:12px;color:#aaa">${receipt ? 'Payment screenshot attached.' : 'No screenshot attached.'}</p>
        </div>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[reserve] email error:', err);
    return NextResponse.json({ error: 'Failed to send.' }, { status: 500 });
  }
}

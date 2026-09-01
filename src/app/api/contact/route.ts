import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    // Store in database
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(200) NOT NULL,
          subject VARCHAR(200),
          message TEXT NOT NULL,
          read BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `;
      await sql`INSERT INTO contact_messages (name, email, subject, message) VALUES (${name}, ${email}, ${subject || ''}, ${message})`;
    } catch (dbError) {
      console.error('DB error (non-fatal):', dbError);
      // Continue even if DB fails — form still works
    }

    // In production, you would also:
    // 1. Send email via Resend/SendGrid
    // 2. Send Slack notification
    // 3. Add to newsletter

    return NextResponse.json({ success: true, message: 'Message received!' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}

// GET all messages (for admin)
export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 50
    `;
    return NextResponse.json(result);
  } catch {
    return NextResponse.json([]);
  }
}

import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { name, role, company, quote } = await request.json();

    // Validate
    if (!name || !quote) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
    }

    if (quote.length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters' }, { status: 400 });
    }

    // Store in database
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS testimonials (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          role VARCHAR(200),
          company VARCHAR(200),
          quote TEXT NOT NULL,
          approved BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `;
      await sql`INSERT INTO testimonials (name, role, company, quote) VALUES (${name}, ${role || ''}, ${company || ''}, ${quote})`;
    } catch (dbError) {
      console.error('DB error (non-fatal):', dbError);
    }

    return NextResponse.json({ success: true, message: 'Thank you for your testimonial!' });
  } catch (error) {
    console.error('Testimonial form error:', error);
    return NextResponse.json({ error: 'Failed to submit testimonial' }, { status: 500 });
  }
}

// GET all approved testimonials (for public display)
export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM testimonials WHERE approved = true ORDER BY created_at DESC LIMIT 20
    `;
    return NextResponse.json(result);
  } catch {
    return NextResponse.json([]);
  }
}

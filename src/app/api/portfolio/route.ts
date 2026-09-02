import { NextResponse } from 'next/server';
import sql from '@/lib/db';

// GET portfolio data
export async function GET() {
  try {
    const result = await sql`SELECT data FROM portfolio_data WHERE key = 'portfolio'` as { data: unknown }[];
    if (result.length === 0) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }
    return NextResponse.json(result[0].data);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// PUT (update) portfolio data
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    await sql`
      INSERT INTO portfolio_data (key, data, updated_at)
      VALUES ('portfolio', ${JSON.stringify(data)}::jsonb, NOW())
      ON CONFLICT (key) DO UPDATE SET data = ${JSON.stringify(data)}::jsonb, updated_at = NOW()
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

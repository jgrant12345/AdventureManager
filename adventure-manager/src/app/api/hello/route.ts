import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const pets = await sql`SELECT * FROM Test;`;
  return NextResponse.json({ pets }, { status: 200 });
}
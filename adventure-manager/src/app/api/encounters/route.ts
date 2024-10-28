import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request) {
  const body = await req.json();
  const { rows } = await sql`
    INSERT INTO encounter (title,adventuresessionid)
    VALUES (${body.Encounter}, 1) RETURNING *;
  `;

  const response = NextResponse.json(rows, {status: 200});
  response.headers

  return response;
}

export async function GET(){
  const { rows } = await sql `SELECT * FROM encounter;`;
  const response = NextResponse.json(rows, {status: 200});
  console.log(rows)
  return response;
}

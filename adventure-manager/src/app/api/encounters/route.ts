import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { cookies } from 'next/headers'
import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/lib/authentication/auth";
import jwt from 'jsonwebtoken';


export async function POST(req: Request) {

  const body = await req.json();
  const { rows } = await sql`
    INSERT INTO encounter (title, adventuresessionid)
    VALUES (${body.Encounter}, 1) RETURNING *;
  `;

  const response = NextResponse.json(rows, {status: 200});

  return response;
}

export async function GET(){
  const cookieStore =  cookies();
  const jsonwebtoken = cookieStore.get('login-cookie');
  

  var decoded = jwt.verify(jsonwebtoken!.value, process.env.JWT_SECRET);

  const { rows } = await sql `SELECT title, id FROM encounter;`;
  const response = NextResponse.json(rows, {status: 200});
  return response;
}

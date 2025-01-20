import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/lib/authentication/auth";
import jwt from "jsonwebtoken";
  
export async function GET() {
  const cookieStore = await cookies();
  const jsonwebtoken = cookieStore.get("login-cookie");

  var decoded = jwt.verify(
    jsonwebtoken!.value,
    process.env.JWT_SECRET
  ) as IJsonToken;

  console.log(decoded)

  const { rows } = await sql`SELECT adventure_session.id, adventure_session.title
    FROM adventure_session INNER JOIN users ON users.id = adventure_session.user_id WHERE adventure_session.user_id = ${decoded.id}`;
  const response = NextResponse.json(rows, { status: 200 });
  return response;
}

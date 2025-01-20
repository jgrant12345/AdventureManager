import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/lib/authentication/auth";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const jsonwebtoken = cookieStore.get("login-cookie");

  const {searchParams} = new URL(req.url);
  const encounterIDURLParam = searchParams.get("encountersId");

  var decoded = jwt.verify(
    jsonwebtoken!.value,
    process.env.JWT_SECRET
  ) as IJsonToken;

  
  const body = await req.json();
  const { rows } = await sql`
    INSERT INTO encounter (title, adventuresessionid)
    VALUES (${body.Encounter}, ${encounterIDURLParam}) RETURNING *;
  `;

  const response = NextResponse.json(rows, { status: 200 });

  return response;
}

export async function GET(req : Request) {

  const cookieStore = await cookies();
  const jsonwebtoken = cookieStore.get("login-cookie");

  const {searchParams} = new URL(req.url);
    const encounterIDURLParam = searchParams.get("encountersId");

  var decoded = jwt.verify(
    jsonwebtoken!.value,
    process.env.JWT_SECRET
  ) as IJsonToken;

  console.log("--------")
  console.log(`encounterID = ${encounterIDURLParam}`)
  const { rows } = await sql`SELECT encounter.title, encounter.id
FROM encounter
INNER JOIN adventure_session
ON adventure_session.id = encounter.AdventureSessionID
WHERE adventure_session.user_id=${decoded.id} AND encounter.AdventureSessionID = ${encounterIDURLParam};`;
  const response = NextResponse.json(rows, { status: 200 });
  return response;
}

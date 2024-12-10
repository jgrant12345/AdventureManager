// /app/api/auth/token/route.js or /app/api/auth/token/route.ts
import jwt from "jsonwebtoken";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

type userBody = {
  userName: string;
  password: string;
};

export async function POST(request: Request, response: Response) {
  const body: userBody = await request.json();



  if (!body.userName || !body.password) {
    return new Response(JSON.stringify({ error: "Invalid input" }), {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);
  // Get the current date in YYYY-MM-DD format
  const currentDate = new Date();
  console.log(currentDate)
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const date = `${day}/${month}/${year}`
  console.log(date)

  const { rows } = await sql`
  INSERT INTO users (username, password, created_at)
  VALUES (${body.userName}, ${hashedPassword}, TO_DATE(${date}, 'DD/MM/YYYY')) RETURNING *;
`;

  const { username } = rows[0];

  return new Response(
    JSON.stringify({ message: "User created", user: username }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  );
}

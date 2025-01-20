import jwt from "jsonwebtoken";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

type userBody = {
  userName: string;
  password: string;
};

export async function POST(request: Request) {
  const body: userBody = await request.json();

  if (!body.userName || !body.password) {
    return new Response(JSON.stringify({ error: "Invalid input" }), {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);
  // Get the current date in YYYY-MM-DD format
  const currentDate = new Date();
  const utcString = currentDate.toISOString();

  const { rows } = await sql`
  INSERT INTO users (username, password, created_at)
  VALUES (${body.userName}, ${hashedPassword}, ${utcString}) RETURNING *;
`;
  const { username, id } =  rows[0];

  await sql`
  INSERT INTO adventure_session (title, user_id)
  VALUES ('first adventure', ${id});`

  // Generate a token with a payload and expiration time
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token will expire in 1 hour
  });

  return new Response(
    JSON.stringify({ message: "User created", user: username }),
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `login-cookie=${
          token
        }; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`,
      },
    }
  );
}

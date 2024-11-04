export declare var process: {
  env: {
    JWT_SECRET: string;
  };
};
// /app/api/auth/token/route.js or /app/api/auth/token/route.ts
import jwt from "jsonwebtoken";

export async function POST(request: Request, response : Response) {
  //   const { userId } = await request.json(); // Assuming `userId` is passed in the request body
  const userId = 41;
  // Generate a token with a payload and expiration time
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token will expire in 1 hour
  });
  console.log("what")
  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `login-cookie=${token}; Path=/; HTTPOnly; Secure; SameSite=Strict`
    },
  });
}

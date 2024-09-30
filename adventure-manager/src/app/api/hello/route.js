// src/app/api/hello/route.js
import { Pool } from 'pg';

// Set up the database connection using environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure your DATABASE_URL is set in Vercel
});

export async function GET(request, response) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Test;');
    client.release();
    
    // Return the data as JSON
    return response.status(200).JSON(results.rows);
  } catch (error) {
    console.error(error);
    return new Response('Error fetching data', { status: 500 });
  }
}

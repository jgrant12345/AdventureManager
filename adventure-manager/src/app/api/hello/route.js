// pages/api/query.js (for Next.js Pages Router)
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Using the environment variable for security
});

export default async function handler(req, res) {
  try {
    const client = await pool.connect();
    
    // Sample SQL query to get data from a 'users' table
    const result = await client.query('SELECT * FROM Test;');
    
    // Close the client connection
    client.release();

    // Return the data as JSON
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error executing query' });
  }
}

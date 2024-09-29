// app/api/hello/route.js
export async function GET(request) {
    return new Response(JSON.stringify({ message: "Hello from the API!" }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  
  export async function POST(request) {
    const data = await request.json();
    return new Response(JSON.stringify({ receivedData: data }), {
      headers: { "Content-Type": "application/json" },
    });
  }
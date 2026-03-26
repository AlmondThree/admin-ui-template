import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
   const id = (await params).id;

   return fetch(
        `${process.env["NEXT_PUBLIC_BACKEND_HOST_AUTH"]}/api/auth/v1/scope/${id}`,
        {
        method: "GET",
        headers: 
            {
            'Content-Type': 'application/json',
            'x-api-key': `${process.env["NEXT_PUBLIC_API_KEY_AUTH"]}`
            },
        }
    )
   
}
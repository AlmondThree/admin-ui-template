import { RequestAssignScope } from "@/manifest/object/rolesProps";

export async function POST(request: Request) {
    const reqBody: RequestAssignScope = await request.json();

    return fetch(
        `${process.env["NEXT_PUBLIC_BACKEND_HOST_AUTH"]}/api/auth/v1/user/roles`,
        {
            method: "POST",
            headers: 
                {
                'Content-Type': 'application/json',
                'x-api-key': `${process.env["NEXT_PUBLIC_API_KEY_AUTH"]}`
                },
            body: JSON.stringify(reqBody)
        }
    )

}
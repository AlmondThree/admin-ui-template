import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function GET(request:Request) {
    const { searchParams } = new URL(request.url);

    switch (searchParams.get('type')) {
        case 'auth':

            const bodyRequest = {
                grant_type: "authorization_code",
                code: searchParams.get('code'),
                isKeepLogin: searchParams.get('iskeeplogin'),
            }
            
            let cookieStore = await cookies();

            try {
                const getAccessToken = await fetch (
                    `${process.env["NEXT_PUBLIC_AUTH_UI_HOST"]}/api/authorization`,
                    {
                        method: "POST",
                        headers: 
                            {
                            'Content-Type': 'application/json',
                            },
                        body: JSON.stringify(bodyRequest)
                    }, 
                )

                if (getAccessToken.ok) {
                    cookieStore.delete('authorization_code')
                    const dataToken = await getAccessToken.json();
                    cookieStore.set({
                        name: 'access_token',
                        value: dataToken.access_token,
                        httpOnly: true,
                        secure: true,
                        maxAge: 7200
                    })
                    if (dataToken.access_token) {
                        cookieStore.set({
                            name: 'isLoggedIn',
                            value: 'true',
                            httpOnly: true,
                            secure: true,
                            maxAge: 7200
                        })
                        if(dataToken.refresh_token) {
                            cookieStore.set({
                                name: 'refresh_token',
                                value: dataToken.refresh_token,
                                httpOnly: true,
                                secure: true,
                                maxAge: 7200
                            })
                        }
                    } else {
                        redirect('/unauthorized')
                    }
                }

            } catch (error) {
                console.log(error as string)
                redirect('/unauthorized')
            }

            redirect('/');
    
        default:
            redirect('/not-foud')
            break;
    }
}
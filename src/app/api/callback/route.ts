import { TokenClaimProps } from "@/manifest/object/callbackProps";
import { redirect, useSearchParams } from "next/navigation";
import { cookies } from "next/headers";


export async function GET(request:Request) {
    const { searchParams } = new URL(request.url);

    switch (searchParams.get('type')) {
        case 'auth':
            
            let cookieStore = await cookies();

            let accessToken = cookieStore.get('access_token');
            let refreshToken = cookieStore.get('refresh_token');

            if (accessToken) {
                cookieStore.set({
                    name: 'isLoggedIn',
                    value: 'true',
                    httpOnly: true,
                    secure: true,
                    maxAge: 7200
                })

                if(refreshToken) {
                    localStorage.setItem('refresh_token', refreshToken.value ?? "null")
                }
            } else {
                redirect('/unauthorized')
            }
            

            redirect('/');
    
        default:
            redirect('/not-foud')
            break;
    }
}
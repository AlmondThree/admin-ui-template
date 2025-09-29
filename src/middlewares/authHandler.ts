import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function authHandler(request:Request, next: Function) {
    
    const cookieStore = await cookies();

    if(cookieStore.get('isLoggedIn')) {
        return next();
    } else {
        if(cookieStore.get('refresh_token')){
            //call by refresh token
        }

        const url = new URL(`${process.env.NEXT_PUBLIC_AUTH_UI_HOST}/signin?nextUrl=${process.env.NEXT_CURR_HOST}/api/callback?type=auth`)
        return NextResponse.redirect(url);
    }

}
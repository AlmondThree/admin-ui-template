import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request:Request) {

    const cookieStore = await cookies();

    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    cookieStore.delete("isLoggedIn");

    fetch(`${process.env.NEXT_PUBLIC_AUTH_UI_HOST}/api/signout`, {
        method: 'POST',

    })

    redirect('/');
    
}
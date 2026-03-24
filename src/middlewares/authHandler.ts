import { Roles } from "@/models/Roles";
import { Token } from "@/models/Token";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import authorizationAttr from "@/manifest/json/authorizationAttr.json"

export async function authHandler(request:NextRequest, next: Function) {

    if(request.nextUrl.pathname.includes('api/')) {
        return next();
    }
    
    const cookieStore = await cookies();

    if(cookieStore.get('isLoggedIn')) {

        //Get Authorized roles from Manifest
        const rolesClass = new Roles(authorizationAttr.mapAuthorizedRole);
        const authorizedRoles = rolesClass.getAuthorizedRoleByPath(request.nextUrl.pathname);

        //Get user roles from Token
        const tokenClass = new Token(cookieStore.get("access_token")?.value);

        const rolesUser : string [] | undefined = await tokenClass.getRoles();

        if (rolesUser !== undefined) {
            for(const items of rolesUser!) {
                if(authorizedRoles?.includes(items)){
                    return next();
                }
            }
        }

        const url = request.nextUrl.clone();
        url.pathname = '/unauthorized'
        return NextResponse.redirect(url);

    } else {
        if(cookieStore.get('refresh_token')){
            //call by refresh token
        }

        const url = new URL(`${process.env.NEXT_PUBLIC_AUTH_UI_HOST}/signin?nextUrl=${process.env.NEXT_CURR_HOST}/api/callback?type=auth`)
        return NextResponse.redirect(url);
    }

}
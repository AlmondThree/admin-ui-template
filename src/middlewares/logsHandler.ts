import { NextRequest, userAgent } from "next/server";
import { Token } from "@/models/Token";
import { Logs, SystemLogs } from "@/models/Logs"
import activityAttribute from "@/manifest/json/activityAttr.json"

export async function logsHandler(request:NextRequest, next: Function) {

    const tokenObj = new Token()
    await tokenObj.getToken()

    //Get activity Id
    let idActivity: string | undefined;
    const activityAttr = activityAttribute;
    const paramPath = (request.nextUrl.pathname.includes('/api/callback')) ? `${request.nextUrl.pathname}/${request.nextUrl.searchParams.get('type')}` : request.nextUrl.pathname;

    for(let items of activityAttr){
        if(items.path == paramPath) {idActivity = items.activityId}
    }

    //Get Roles
    let rolesArray: string[] | undefined= await tokenObj.getRoles()
    
    let rolesStr: string | undefined

    if (rolesArray) {rolesStr= rolesArray!.toString()}

    //Get user id and browser name
    const { device, browser } = userAgent(request);
    const deviceIdPayload = {
        ip: request.headers.get('x-forwarded-for'),
        device: device.type,
        browser: `${browser.name}+${browser.version}`
    }

    const logsPayload: SystemLogs = {
        id_activity: idActivity,
        timestamp: undefined,
        user_id: await tokenObj.getUserId(),
        username: await tokenObj.getUsername(),
        roles: rolesStr,
        device_id: `ip:${deviceIdPayload.ip};device:${deviceIdPayload.device};browser:${deviceIdPayload.browser}`,
        session_id: await tokenObj.getSessionId()
    }

    const logsObj = new Logs(
        logsPayload,
        "systems"
    )

    logsObj.pushLogs()

    next()
}
export interface SystemLogs {
    id_activity : string|undefined,
    timestamp: string|undefined,
    user_id: string|undefined,
    username: string|undefined,
    roles: string|undefined,
    device_id: string,
    session_id: string|undefined
}

export interface InterfaceLogs {
    id_session: string|undefined,
    id_activity: string|undefined,
    timestamp: string|undefined,
    user_id: string|undefined,
    username: string|undefined,
    roles: string|undefined,
    access_token: string|undefined,
    exp_access_token: null,
    refresh_token: string|undefined,
    exp_refresh_token: null,
    device_id: string|undefined,
    is_active: boolean|undefined
}

export class Logs {
    logsType: "systems" | "interface" | undefined
    logsPayload: SystemLogs  | InterfaceLogs | undefined
    
    constructor(
        logs :SystemLogs | InterfaceLogs,
        typeLogs: "systems" | "interface"
    ) {
        if(logs && typeLogs) {
            this.logsPayload = logs
            this.logsType = typeLogs
        } else {
            this.logsType = "systems";
        }
    }

    async pushLogs() {

        if(this.logsPayload?.timestamp === "undefined"){
           this.logsPayload.timestamp = new Date().toDateString()
        }

        fetch(
            `${process.env["NEXT_PUBLIC_BACKEND_HOST"]}/api/logs/v1/${this.logsType}`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': `${process.env["NEXT_PUBLIC_API_KEY"]}`
                },
                body: JSON.stringify(this.logsPayload)
            }
        )
    }

}
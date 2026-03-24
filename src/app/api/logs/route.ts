import createParamsAPI from "@/hooks/createParamsAPI";
import apiAttribute from "../../../manifest/json/logsSystemAttr.json"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const typeLog: string = searchParams.get('type')!;

    const paramLog: "log_system" | "session_log" | "interface_log" = (typeLog === "log_system" || typeLog === "session_log" || typeLog === "interface_log") ? typeLog : "log_system";

    const objectLogs = apiAttribute[paramLog];

    const paramPagination = {
        page: searchParams.get('page'),
        limit: searchParams.get('limit')
    }

    const parameter = createParamsAPI(objectLogs.parameters, paramPagination)

    return fetch(
        `${process.env["NEXT_PUBLIC_BACKEND_HOST"]}/api/logs/v1${objectLogs.endpoint}${parameter}`,
        {
        method: "GET",
        headers: 
            {
            'Content-Type': 'application/json',
            'x-api-key': `${process.env["NEXT_PUBLIC_API_KEY"]}`
            },
        }
    )
}
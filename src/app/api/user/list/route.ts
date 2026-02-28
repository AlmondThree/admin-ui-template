import createParamsAPI from "@/hooks/createParamsAPI";
import { StandardListProps, StandardListReqParam } from "@/manifest/object/interfaceProps";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const reqAttr: StandardListReqParam = {
        q: searchParams.get('q'),
        page: searchParams.get('page'),
        size: searchParams.get('size')
    }

    const parameter = createParamsAPI(StandardListProps.parameter, reqAttr);

    return fetch(
        `${process.env["NEXT_PUBLIC_BACKEND_HOST_AUTH"]}/api/auth/v1/users/list${parameter}`,
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
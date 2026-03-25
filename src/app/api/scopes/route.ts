import createParamsAPI from "@/hooks/createParamsAPI";
import { StandardListReqParam } from "@/manifest/object/interfaceProps";
import { getScopeProps } from "@/manifest/object/scopesProps";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const reqAttr: StandardListReqParam = {
        q: searchParams.get('q'),
        page: searchParams.get('page'),
        size: searchParams.get('size')
    }

    const parameter = createParamsAPI(getScopeProps.parameter, reqAttr);

    return fetch(
        `${process.env["NEXT_PUBLIC_BACKEND_HOST_AUTH"]}/api/auth/v1/scope${parameter}`,
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
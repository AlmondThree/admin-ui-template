import { ManifestType } from "./interfaceProps"

export type ResGetRole = {
    status: boolean,
    pages: {
        page: number | undefined | null,
        size: number | undefined | null,
        total_data: number | undefined | null,
        last_page: number | undefined | null
    },
    data: [
        {
            role_name: string | undefined | null,
            description: string | undefined | null
        }
    ]
}

export const getRoleProps: ManifestType = {
    id: "getRole",
    endpoint: "/roles",
    parameter: ['q', 'page', 'size'],
    responseField: ['status', 'pages', 'data']
}

export const getUserDetailsProps: ManifestType = {
    id: "getUserDetails",
    endpoint: "/users/:id",
    parameter: [],
    responseField: ['status', 'pages', 'data']
}

export type  RequestAssignScope= {
    scopeId: string | undefined | null,
    roleId: string[] | undefined | null
}
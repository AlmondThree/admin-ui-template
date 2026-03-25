import { ManifestType } from "./interfaceProps"

export type ResGetScope = {
    status: boolean,
    pages: {
        page: number | undefined | null,
        size: number | undefined | null,
        total_data: number | undefined | null,
        last_page: number | undefined | null
    },
    data: [
        {
            id_scope: string | undefined | null,
            scope_name: string | undefined | null,
            description: string | undefined | null
        }
    ]
}

export const getScopeProps: ManifestType = {
    id: "getScope",
    endpoint: "/scope",
    parameter: ['q', 'page', 'size'],
    responseField: ['status', 'pages', 'data']
}
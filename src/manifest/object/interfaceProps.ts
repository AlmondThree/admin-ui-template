export type ManifestType = {
    id: string,
    endpoint: string,
    parameter: string[],
    responseField: string[]
}

export type StandardListReqParam = {
    q: string | undefined | null,
    page: number | string | undefined | null,
    size: number | string | undefined | null
}

export type StandardListResponse = {
    status: boolean,
    pages: {
        page: number | undefined | null,
        size: number | undefined | null,
        total_data: number | undefined | null,
        last_page: number | undefined | null
    },
    data: object[]
}

export const StandardListProps = {
    id: "StandardListProps",
    endpoint: null,
    parameter: ['q', 'page', 'size'],
    responseField: ['status', 'pages', 'data']
}
import { ManifestType } from "./interfaceProps"

export type DataUser = {
    id: string | undefined | null,
    username: string | undefined | null,
    firstName: string | undefined | null,
    lastName: string | undefined | null,
    email: string | undefined | null,
    employeeId: string | undefined | null,
    roles: string[] | undefined | null,
}

export const getUserDetailsProps: ManifestType = {
    id: "getUserDetails",
    endpoint: "/users/:id",
    parameter: [],
    responseField: ['status', 'pages', 'data']
}

export type  RequestAssignRoles= {
    userId: string | undefined | null,
    roleId: string[] | undefined | null
}
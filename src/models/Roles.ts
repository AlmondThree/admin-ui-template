import matchWildcard from "@/utils/wildcard/matchWildcard";

export class Roles {
    dataList: {
        path: string;
        authorizedRole: string[];
    }[] | undefined

    data: {
        path: string;
        authorizedRole: string[];
    } | undefined

    path: string|undefined;
    roles: string|undefined;
    authorizedRole: string[]|undefined

    constructor(dataManifest: Roles["dataList"]) {
        if(dataManifest){
            this.dataList = dataManifest;
            this.path = dataManifest[0].path;
            this.authorizedRole = dataManifest[0].authorizedRole
        }
    }

    getRoles() {
        return this.roles;
    }

    getAuthorizedRole() {
        return this.authorizedRole
    }

    getAuthorizedRoleByPath(inputPath: string) {
        let dataIteration: {path: string; authorizedRole: string[]}[] = this.dataList!

        for(let i = 0 ; i < this.dataList?.length!; i++) {
            const wildCard = matchWildcard(inputPath, dataIteration[i].path)
            if(dataIteration[i].path.includes(inputPath) || wildCard) {
                return dataIteration[i].authorizedRole;
            }
        }
    }
}
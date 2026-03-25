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
        if (!this.dataList) return undefined;

        const dataIteration = this.dataList;

        for (let i = 0; i < dataIteration.length; i++) {
            const currentPath = dataIteration[i].path;
            const wildCard = matchWildcard(inputPath, currentPath);

            if (currentPath.includes(inputPath) || wildCard) {
                return dataIteration[i].authorizedRole;
            }
        }
        
        return undefined;
    }
}
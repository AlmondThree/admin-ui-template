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
            if(dataIteration[i].path.includes(inputPath)) {
                return dataIteration[i].authorizedRole;
            }
        }
    }
}
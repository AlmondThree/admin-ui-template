import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export class Token {
    token: string | undefined;
    userId: string | undefined;
    username: string | undefined;
    employeeId: string | undefined;
    roles: string[] | undefined;
    sessionId: string | undefined;
    expired: string | undefined;

    constructor(paramToken?: string){
        if(paramToken) {
            this.token = paramToken;
            this.decryptToken();
        } else {
            this.getToken()
        }
    }

    async getToken() {
        const cookieStore = await cookies();

        this.token = cookieStore.get("access_token")?.value;

        if(this.token) {this.decryptToken();}

        return this.token;

    }

    decryptToken() {
        const decodeToken = jwtDecode<{
            user_id?: string,
            username?: string,
            employee_id?: string,
            roles?: string[],
            session_id?: string,
            expired?: string,
        }>(this.token!);

        if(decodeToken) {
            this.userId = decodeToken.user_id
            this.username = decodeToken.username
            this.employeeId = decodeToken.employee_id
            this.roles = decodeToken.roles
            this.sessionId = decodeToken.session_id
            this.expired = decodeToken.expired
        }
    }

    async getUserId() {
        return this.userId;
    }

    async getUsername(){
        return this.username;
    }

    async getEmployeeId() {
        return this.employeeId;
    }

    async getRoles() {
        return this.roles;
    }

    async getSessionId() {
        return this.sessionId;
    }

    async getExpired() {
        return this.expired;
    }
}
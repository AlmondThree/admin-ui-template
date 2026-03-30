import { jwtDecode } from "jwt-decode";

type JwtData = {
    user_id: string,
    username: string,
    employee_id: string,
    roles: string[],
}

export const decodeToken = (token: string) => {
    if (token) {
      const decodedToken: JwtData = jwtDecode(token)

        return (
            {
                userId: decodedToken.user_id,
                username: decodedToken.username,
                employeeId: decodedToken.employee_id,
                roles: decodedToken.roles,
            }
        )
    }
    
}
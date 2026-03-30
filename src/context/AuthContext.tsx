"use client";

import type React from "react";
import { createContext, useContext } from "react";

export type AuthProps = {
    name: string,
    username: string,
    initial: string,
    email: string,
}

type AuthContextType = {
    Props: AuthProps
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode, AuthProps: AuthProps}> = ({
    children,
    AuthProps
}) => {

    const Props: AuthProps = AuthProps

    return(
        <AuthContext.Provider value={{ Props }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
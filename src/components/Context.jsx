import React, { createContext, useState, useContext } from "react";
import api from "../services/noemichi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        try {
            const data = { 
                username, 
                password 
            }
            const response = await api.post('user/login', data)
            // //console.log( response );

            if ( !response.data.error ) {
                setUser(response.data.user);
            }

            return !response.data.error;
        } catch (error) {
            //console.log( error );
            return false;
        }
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}
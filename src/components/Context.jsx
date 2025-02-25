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
                sessionStorage.setItem('user', JSON.stringify(response.data.user));
                // console.log( localStorage );
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

    const searchUser = () => {
        const userLocal = sessionStorage.getItem('user');
        if ( userLocal !== null && userLocal !== undefined ) {
            console.log( userLocal );
            setUser(JSON.parse(userLocal));
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, searchUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}
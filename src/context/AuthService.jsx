import React, {useState, useEffect, createContext} from "react"
import { auth } from "../config/firebase"

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(()=>{
        auth.onAuthStateChanged((user)=> {
            setUser(user)
        })
    }, [])
    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider
}
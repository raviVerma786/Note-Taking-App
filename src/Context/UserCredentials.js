import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = (props) =>{
    const [user,setUser] = useState(null);
    const [email,setEmail] = useState(null);
    const [signedIn,setSignedIn] = useState(false);

    return (
        <UserContext.Provider value={{signedIn,setSignedIn,email,setEmail,user,setUser}}>
            {props.children}
        </UserContext.Provider>
    )
};
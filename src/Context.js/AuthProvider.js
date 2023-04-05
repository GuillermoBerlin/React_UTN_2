import React, {useState}  from "react";
import AuthContext from "./AuthContext";

            
function AuthProvider(props){
    
    const [userLogged, setUserLogged] = useState(false)
    
    const loginUser = () =>{
        setUserLogged(true)   
    } 

    const logoutUser = () =>{
        setUserLogged(false)   
    } 
    
    return(
        <AuthContext.Provider value={{loginUser, logoutUser, userLogged}}>
            {props.children}
        </AuthContext.Provider>
    )
} 
export default AuthProvider
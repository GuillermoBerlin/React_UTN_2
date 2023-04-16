import React, {useState}  from "react";
import AuthContext from "./AuthContext";

            
function AuthProvider(props){

    const [userLogged, setUserLogged] = useState(false)
    
      //const [token, setToken] = useState(localStorage.getItem('token'));
    const initUser = () =>{
        if (localStorage.getItem('token')!=null)
        setUserLogged(true)   
    } 

    const loginUser = () =>{
        setUserLogged(true)   
    } 

    const logoutUser = () =>{
        setUserLogged(false)   
    } 
    
    return(
        <AuthContext.Provider value={{loginUser, logoutUser, userLogged, initUser}}>
            {props.children}
        </AuthContext.Provider>
    )
} 
export default AuthProvider
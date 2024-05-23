import { createContext, useContext, useState } from "react"
import { RenderHeader } from "../components/structure/Header";
import { RenderMenu, RenderRoutes } from "../components/structure/RenderNavigation";
import { setSessionItem } from "../components/helpers/sessionStorageHelpers";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {

     const [ user, setUser ] = useState(
          {
               name: (sessionStorage.getItem("name") ?? ""), 
               isAuthenticated: (sessionStorage.getItem("isAuthenticated") === 'true'? true : false),
               token:(sessionStorage.getItem("token") ?? "")
          })
     
     const login = (userName, password) => {

          // Make a call to the authentication API to check the username
          return new Promise((resolve, reject) => {
               if (password === "password123") {
                    setSessionItem("name",'will');
                    setSessionItem("token", '53B224BE-B623-41E2-AFAC-6F73C9637726');
                    setSessionItem("isAuthenticated", true);
                    setUser({name: userName, isAuthenticated: true, token: '53B224BE-B623-41E2-AFAC-6F73C9637726'})
                    resolve("success")
               } else {
                    reject("Incorrect password")
               }
          })
     }

     const logout = () => {

          setUser({...user, isAuthenticated: false})
          setSessionItem("name","")
          setSessionItem("isAuthenticated",false)
          setSessionItem("token","")
     }

     return (
          
               <AuthContext.Provider value={{user, login, logout}}>
                    <>
                         <RenderHeader />
                         <RenderMenu />
                         <RenderRoutes />
                    </>                   
               </AuthContext.Provider>
          
     )

}
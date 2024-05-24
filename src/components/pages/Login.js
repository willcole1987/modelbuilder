import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../contexts/AuthWrapper";
// import { setSessionItem, getSessionItem } from "../helpers/sessionStorageHelpers";
// import axios from "axios";

export const Login = () => {

     const navigate = useNavigate();
     const { login } = AuthData();
     const [ formData, setFormData ] = useReducer((formData, newItem) => 
                                                            { return ( {...formData, ...newItem} )}, 
                                                            {userName: "", password: ""})
     const [ errorMessage, setErrorMessage ] = useState(null)

     const doLogin = async () => {
          try {
               await login(formData.userName, formData.password)
               navigate("/")
          } catch (error) {
               setErrorMessage(error)
          }
     }

     return (
          <div className="page">
               <h2>User Login</h2>
               <div className="inputs">
                    <div className="input">
                         <input value={formData.userName} 
                                onChange={(e) => setFormData({userName: e.target.value}) } 
                                placeholder="username"
                                type="text"/>
                    </div>
                    <div className="input">
                         <input value={formData.password} 
                                onChange={(e) => setFormData({password: e.target.value}) } 
                                placeholder="password"
                                type="password"/>
                    </div>
                    <div className="button">
                         <button onClick={doLogin}>Log in</button>
                    </div>
                    {errorMessage ?
                    <div className="error">{errorMessage}</div>
                    : null }
               </div>
          </div>
     )
}
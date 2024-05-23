import { Link, Route, Routes } from "react-router-dom";
import { AuthData } from "../../contexts/AuthWrapper";
import { nav } from "./navigation";


export const RenderRoutes = () => {

        const { user } = AuthData();
        
        return (
             <Routes>
             { nav.map((r, i) => {
                  // use an authentication callback here to determine whether to display or not
                  // Use JWT to communicate with the server - determines user login and authorisation
                  // Set a timeout function => JWT token can be stored in sessionstorage as it'sunique to session and user
                  // JWT = Not reproducible on another machine
                  if (r.isPrivate && user.isAuthenticated) {
                       return <Route key={i} path={r.path} element={r.element}/>
                  } else if (!r.isPrivate) {
                       return <Route key={i} path={r.path} element={r.element}/>
                  } else return false
             })
             }
             </Routes>
        )
   }
   
   export const RenderMenu = () => {
   
        const { user, logout } = AuthData()
   
        const MenuItem = ({r}) => {
             return (<div className="menuItem"><Link to={r.path}>{r.name}</Link></div>)
        }
        // TODO - find a way to add these in as menu child components
        return (
             <div className="menu"> 
                  { nav.map((r, i) => {
   
                       if (!r.isPrivate && r.isMenu) {
                            return (
                                 <MenuItem key={i} r={r}/>
                            )
                       } else if (user.isAuthenticated && r.isMenu) {
                            return (
                                 <MenuItem key={i} r={r}/>
                            )
                       } else return false
                  } )}
   
                  { user.isAuthenticated ?
                  <div className="menuItem"><Link to={'#'} onClick={logout}>Log out</Link></div>
                  :
                  <div className="menuItem"><Link to={'login'}>Log in</Link></div> }
             </div>
        )
   }
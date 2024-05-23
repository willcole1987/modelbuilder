import { About } from "../pages/About"
import { Account } from "../pages/Account"
import { Home } from "../pages/Home"
import { NodeWordingSingle } from "../pages/NodeWordingSingle"
import { NodeWordingDouble } from "../pages/NodeWordingDouble"
import { Login } from "../pages/Login"
import { Private } from "../pages/Private"

export const nav = [
     { path:     "/",                  name: "Model Home",       element: <Home />,                     isMenu: true,     isPrivate: false  },
     { path:     "/about",             name: "About",            element: <About />,                    isMenu: true,     isPrivate: false  },
     { path:     "/login",             name: "Login",            element: <Login />,                    isMenu: false,    isPrivate: false  },
     { path:     "/NodeWordingSingle", name: "Wording",          element: <NodeWordingSingle />,        isMenu: true,     isPrivate: false  },
     { path:     "/NodeWordingDouble", name: "Grid Wording",     element: <NodeWordingDouble />,        isMenu: true,     isPrivate: false  },
     { path:     "/private",           name: "Private",          element: <Private />,                  isMenu: true,     isPrivate: true  },
     { path:     "/account",           name: "Account",          element: <Account />,                  isMenu: true,     isPrivate: true  },
]
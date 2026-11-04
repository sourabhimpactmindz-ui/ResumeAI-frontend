
import { createBrowserRouter} from "react-router-dom";
import UserLogin from "../pages/user.pages/Userlogin";
import PrivateRouter from "../protectedRouter/privateRouter";
import Home from "../pages/Home/home";
import SignUp from "../pages/user.pages/Usersignup";
import OTPPage from "../pages/otp.page/otp.page";
import PolicyPages from "../pages/policy/policy";
import About from "../pages/about/about";
import Terms from "../pages/terms/terms";
import Contact from "../pages/contact/contact";
import Disclaimer from "../pages/Disclaimer/Disclaimer";
import Simplepage from "../pages/simple/simplepage";

const router = createBrowserRouter([
    
    {
        path : "/",
        element : <Simplepage />
    }
    ,{
        path : "/login",
        element : <UserLogin />
    },
    {
        path : "/signup",
        element : <SignUp />

    },
     {
            path : "/verifyOTP",
            element : <OTPPage />
        },
{

    element:<PrivateRouter />,
    children:[
        {
            path : "/home",
            element : <Home />
        },
        {
            path : "/policy",
            element : <PolicyPages />
        },
        {
            path : "/about",
            element : <About />
        },{
            path : "/terms",
            element : <Terms />
        }, 
        {
            path : "/contact",
            element : <Contact />
        },
        {
            path : "/disclaimer",
            element : <Disclaimer />
        }
       
    ]
}
])

export default router;
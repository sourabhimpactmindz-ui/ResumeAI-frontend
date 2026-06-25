
import { createBrowserRouter} from "react-router-dom";
import UserLogin from "../pages/user.pages/Userlogin";
import PrivateRouter from "../protectedRouter/privateRouter";
import Home from "../pages/Home/home";
import SignUp from "../pages/user.pages/Usersignup";
import OTPPage from "../pages/otp.page/otp.page";
import PolicyPages from "../pages/policy/policy";

const router = createBrowserRouter([
    {
        path : "/",
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
        }
       
    ]
}
])

export default router;
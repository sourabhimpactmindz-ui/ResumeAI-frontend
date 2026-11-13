import { createBrowserRouter } from "react-router-dom";
import UserLogin from "../pages/user.pages/Userlogin";
import PrivateRouter from "../protectedRouter/privateRouter";
import SignUp from "../pages/user.pages/Usersignup";
import OTPPage from "../pages/otp.page/otp.page";
import PolicyPages from "../pages/policy/policy";
import About from "../pages/about/about";
import Terms from "../pages/terms/terms";
import Contact from "../pages/contact/contact";
import Disclaimer from "../pages/Disclaimer/Disclaimer";
import Blog from "../pages/blog/blog";
import Homee from "../pages/simple/Homee";
import Dashboard from "../pages/Home/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homee />,
  },
  {
    path: "/login",
    element: <UserLogin />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/verifyOTP",
    element: <OTPPage />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/policy",
    element: <PolicyPages />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
  {
    path: "/disclaimer",
    element: <Disclaimer />,
  },
  {
    element: <PrivateRouter />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;

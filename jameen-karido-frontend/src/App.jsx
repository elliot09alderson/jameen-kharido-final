import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from "./pages/components/Footer.jsx";
import Home from "./pages/HOME/Home.jsx";
import NotFound from "./pages/components/NotFound.jsx";
import Ads from "./pages/ADS/Ads.jsx";
import "./App.css";
import ViewDetails from "./pages/ADS/ViewDetails.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import PublicRoute from "./Routes/PublicRoute.jsx";
import { Slide } from "react-toastify";
import { toast } from "react-toastify";
import PostHome from "./pages/POST/HOME/PostHome.jsx";
import PostFlat from "./pages/POST/FLAT/PostFlat.jsx";
import POST from "./pages/POST/POST.jsx";
import PostShop from "./pages/POST/SHOP/PostShop.jsx";
import AdsByCategory from "./pages/ADS/AdsByCategory.jsx";
import RegisterAgent from "./pages/Agent/RegisterAgent.jsx";
import LoginAgent from "./pages/Agent/LoginAgent.jsx";
import { useDispatch, useSelector } from "react-redux";
import PublicAgentRouter from "./pages/ProtectedAuth/PublicAgentRouter.jsx";
import PivateAgentRouter from "./pages/ProtectedAuth/PivateAgentRouter.jsx";
import { useEffect } from "react";
import { check_session, messageClear } from "./rtk/slices/authSlice.js";

import MyProfile from "./pages/ADS/MyProfile.jsx";
import PostLand from "./pages/POST/LAND/PostLand.jsx";

import AdminLogin from "./pages/ADMIN/Auth/AdminLogin.jsx";
import PublicAdminRouter from "./pages/ADMIN/Route/PublicAdminRouter.jsx";
import PivateAdminRouter from "./pages/ADMIN/Route/PivateAdminRouter.jsx";
import Admin from "./pages/ADMIN/Pages/Admin.jsx";
import GetAllAgent from "./pages/ADMIN/Pages/GetAllAgent.jsx";
import GetAllBlockedAgent from "./pages/ADMIN/Pages/GetAllBlockedAgent.jsx";

const App = () => {
  const dispatch = useDispatch();
  const { userInfo, successMessage, errorMessage, loader } = useSelector(
    (slice) => slice.auth
  );
  useEffect(() => {
    dispatch(check_session());

    // console.log(userInfo);
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    } else if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "admin",
      children: [
        {
          element: <PublicAdminRouter />,
          children: [
            {
              path: "login",
              element: <AdminLogin />,
            },
          ],
        },

        {
          path: "",

          children: [
            {
              element: <PivateAdminRouter />,
              children: [ 
                {
                  index: true,
                  element: <Admin />,
                },
                {
                  path: "allAgent",
                  element: <GetAllAgent />,
                },
                {
                  path: "allBlockAgent",
                  element: <GetAllBlockedAgent />,
                },
              ],
            },
          ],
        },

        // {
        //   path: "post",

        //   children: [
        //     {
        //       element: <PivateAgentRouter />,
        //       children: [
        //         {
        //           index: true,
        //           element: <POST />,
        //         },
        //         {
        //           path: "flat",
        //           element: <PostFlat />,
        //         },
        //         {
        //           path: "land",
        //           element: <PostLand />,
        //         },
        //         {
        //           path: "home",
        //           element: <PostHome />,
        //         },
        //         {
        //           path: "shop",
        //           element: <PostShop />,
        //         },
        //       ],
        //     },
        //   ],
        // },
      ],
    },

    {
      path: "/agent",
      children: [
        {
          element: <PublicAgentRouter />,
          children: [
            { path: "register", element: <RegisterAgent /> },
            { path: "login", element: <LoginAgent /> },
          ],
        },

        {
          path: "myAds",

          children: [
            {
              element: <PivateAgentRouter />,
              children: [
                {
                  index: true,
                  element: <MyProfile />,
                },
              ],
            },
          ],
        },

        {
          path: "post",

          children: [
            {
              element: <PivateAgentRouter />,
              children: [
                {
                  index: true,
                  element: <POST />,
                },
                {
                  path: "flat",
                  element: <PostFlat />,
                },
                {
                  path: "land",
                  element: <PostLand />,
                },
                {
                  path: "home",
                  element: <PostHome />,
                },
                {
                  path: "shop",
                  element: <PostShop />,
                },
              ],
            },
          ],
        },
      ],
    },

    {
      path: "/ads",
      element: <Ads />,
    },
    {
      path: "/ads/:catname",
      element: <AdsByCategory />,
    },
    {
      path: "/ad/detail",
      element: <ViewDetails />,
    },

    {
      path: "/",
      element: <PublicRoute />, // Public routes wrapper
      children: [
        {
          path: "login",
          element: <Login />,
        },

        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />

      {/* <Footer /> */}
    </div>
  );
};

export default App;

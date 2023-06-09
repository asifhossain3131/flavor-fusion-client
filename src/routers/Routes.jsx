import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/public/home/home/Home";
import Shop from "../layouts/Shop";
import Menus from "../pages/public/menus/menus/Menus";
import CategoryWiseMenu from "../pages/public/menus/category wise menu/CategoryWiseMenu";
import Login from "../pages/public/user/Login";
import Register from "../pages/public/user/Register";
import SingleFood from "../pages/public/menus/single food/SingleFood";
import PrivateRoute from "./PrivateRoute";
import UserDashboard from "../layouts/UserDashboard";
import UserHome from "../pages/private/dashboard/user dashboard/UserHome";
import UserCart from "../pages/private/dashboard/user dashboard/UserCart";
import AllUsers from "../pages/private/dashboard/admin dashboard/AllUsers";
import AddItem from "../pages/private/dashboard/admin dashboard/AddItem";
import ManageFood from "../pages/private/dashboard/admin dashboard/ManageFood";
import PaymentSuccess from "../pages/private/dashboard/user dashboard/PaymentSuccess";
import PaymentHistory from "../pages/private/dashboard/user dashboard/PaymentHistory";
import AllOrders from "../pages/private/dashboard/admin dashboard/AllOrders";

  const router=createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
              path:'/login',
              element:<Login></Login>
            },
            {
              path:'/register',
              element:<Register></Register>
            }
        ]
         
    },
    {
      path:'/shop',
      element:<Shop></Shop>,
      children:[
        {
          path:'/shop',
          element:<Menus></Menus>,
          loader:()=>fetch('https://flavor-fusion-server-six.vercel.app/countMenus')
        },
        {
          path:'shop/categoryFood/:name',
          element:<CategoryWiseMenu></CategoryWiseMenu>
        },
        {
          path:'singlefood/:id',
          element:<PrivateRoute><SingleFood></SingleFood></PrivateRoute>,
          loader:({params})=>fetch(`https://flavor-fusion-server-six.vercel.app/menu/${params.id}`)
        }
      ]
    },
    {
      path:'dashboard',
      element:<PrivateRoute><UserDashboard></UserDashboard></PrivateRoute>,
      children:[
        {
          path:'/dashboard',
          element:<UserHome></UserHome>
        },
        {
          path:'cart',
          element:<UserCart></UserCart>
        },
        {
          path:'allusers',
          element:<AllUsers></AllUsers>
        },
        {
     path:'reservation'
        },
        {
       path:'paymenthistory',
       element:<PaymentHistory></PaymentHistory>
        },
        {
          path:'additem',
          element:<AddItem></AddItem>
        },
        {
          path:'managefood',
          element:<ManageFood></ManageFood>
        },
        {
     path:'allorders',
     element:<AllOrders></AllOrders>
        },
        {
          path:'paymentSuccess/:transId',
          element:<PaymentSuccess></PaymentSuccess>
        }
      ]
    }
  ])

  export default router
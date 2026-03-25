import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layout/MainLayout.jsx";
import Home from './pages/Home/Home.jsx';
import Cart from './pages/cart/Cart.jsx';
import Login from './pages/auth/login/Login.jsx';
import Register from './pages/auth/register/Register.jsx';
import ProductDetails from "./pages/products/ProductDetails.jsx";
import Shop from "./pages/shop/Shop.jsx";
import ProtectedRouter from "./ProtectedRouter.jsx";
import About from "./pages/about/About.jsx";
import Profile from "./pages/profile/Profile.jsx";
import ProfileInfo from "./pages/profile/ProfileInfo.jsx";
import ProfileOrders from "./pages/profile/ProfileOrders.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    element:

      <MainLayout />
    ,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/cart',
        element:
          <ProtectedRouter>
            <Cart />
          </ProtectedRouter>


      },
      {
        path: '/products/:id',
        element: <ProductDetails />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/shop',
        element: <Shop />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/profile',
        element:
          <ProtectedRouter>
            <Profile />
          </ProtectedRouter>,
        children:[
          {
            index: true,
            element: <ProfileInfo />

          },
          {
            path: 'orders',
            element: <ProfileOrders />
          }
        ]
      }
    ]
  }
]);

export default router;
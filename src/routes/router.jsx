import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App.jsx";
import Home from "./Home.jsx";
import { AuthContext } from "../Auth.jsx";
import { useContext } from "react";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import PlaceOverview from "../components/PlaceOverview.jsx";
import Wishlist from "../components/Wishlist.jsx";
import Category from "../components/Category.jsx";
import AddPlace from "../components/AddPlace.jsx";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // Render login only for users who are not logged in
      {
        path: "login",
        element: (
          <LoginGuard />
        ),
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "add-place",
        element: <AddPlace />,
      },
      {
        path: "/category/:categoryType",
        element: <Category />,
      },
      {
        path: "place/:placeid",
        element: <PlaceOverview />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
    ],
  },
]);

// Helper component: shows <Login /> if not logged in, otherwise redirects home
function LoginGuard() {
  const auth = useContext(AuthContext) || {};
  const { isLoggedIn } = auth;
  return isLoggedIn ? <Navigate to="/" replace /> : <Login />;
}

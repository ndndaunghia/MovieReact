import { Outlet, createBrowserRouter } from "react-router-dom";
import { Children } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomeMovies from "./Components/HomeMovies";
import MyList from "./pages/MyList";
import SignIn from "./pages/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: "/",
        element: <HomeMovies />,
      },
    ],
  },
  {
    path: '/sign-in',
    element: (
        <SignIn/>
    )
  }
]);

export default router;
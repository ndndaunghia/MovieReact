import { Outlet, createBrowserRouter } from "react-router-dom";
import { Children } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomeMovies from "./Components/HomeMovies";
import MyList from "./pages/MyList";
import SignIn from "./pages/SignIn";
import MovieDetail from "./Components/MovieDetail";
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";
import AllMovies from "./pages/AllMovies";
import TVSeries from "./pages/TvSeries";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/Forgot-Password";

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
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: 'forgot-password',
    element: <ForgotPassword/>
  },
  {
    path: "/mylist",
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: "/mylist",
        element: <MyList />,
      },
    ],
  },
  {
    path: '/profile',
    element: (
      <>
      <Header/>
      <Profile/>
      <Footer/>
      </>
    )
  },
  {
    path: "/mylist/movie-detail/:id",
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: "/mylist/movie-detail/:id",
        element: <MovieDetail />,
      },
    ],
  },
  {
    path: "/search?",
    element: (
      <>
        <Header />
        <Search />
        <Footer />
      </>
    ),
  },
  {
    path: "/search/movie-detail/:id",
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: "/search/movie-detail/:id",
        element: <MovieDetail />,
      },
    ],
  },
  {
    path: "/movie-detail/:id",
    element: (
      <div>
        <Header />
        <MovieDetail />
        <Footer />
      </div>
    ),
  },
  {
    path: "/all-movies",
    element: (
      <>
        <Header />
        <AllMovies />
        <Footer />
      </>
    ),
  },
  {
    path: "/all-movies/movie-detail/:id",
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: "/all-movies/movie-detail/:id",
        element: <MovieDetail />,
      },
    ],
  },
  {
    path: "/tv-series",
    element: (
      <>
        <Header />
        <TVSeries/>
        <Footer />
      </>
    ),
  },
  {
    path: "/tv-series/movie-detail/:id",
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: "/tv-series/movie-detail/:id",
        element: <MovieDetail />,
      },
    ],
  },
]);

export default router;

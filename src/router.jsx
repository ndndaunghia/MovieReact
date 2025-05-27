import React from 'react';
import { Outlet, createBrowserRouter, Navigate } from "react-router-dom";
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
import AdminLayout from './Components/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import UserManagement from './pages/Admin/UserManagement';
import Movies from './pages/Admin/Movies/Movies';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import PublicRoute from './Components/PublicRoute/PublicRoute';
import Categories from './pages/Admin/Categories/Categories';
import Users from './pages/Admin/Users/Users';
// Admin Routes
const adminRoutes = {
  path: '/admin',
  element: (
    <ProtectedRoute isAdmin={true}>
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    // {
    //   path: 'dashboard',
    //   element: <Dashboard />,
    // },
    {
      path: 'users',
      element: <Users />,
    },
    {
      path: 'movies',
      element: <Movies />,
    },
    {
      path: 'categories',
      element: <Categories />,
    }
  ],
};

// Public Routes
const publicRoutes = [
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
    element: (
      <PublicRoute>
        <SignIn />
      </PublicRoute>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
  },
  {
    path: 'forgot-password',
    element: (
      <PublicRoute>
        <ForgotPassword />
      </PublicRoute>
    ),
  },
  {
    path: "/mylist",
    element: (
      <ProtectedRoute>
        <Header />
        <Outlet />
        <Footer />
      </ProtectedRoute>
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
      <ProtectedRoute>
        <Header />
        <Profile />
        <Footer />
      </ProtectedRoute>
    ),
  },
  {
    path: "/mylist/movie-detail/:id",
    element: (
      <ProtectedRoute>
        <Header />
        <Outlet />
        <Footer />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/mylist/movie-detail/:id",
        element: <MovieDetail />,
      },
    ],
  },
  {
    path: "/search",
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
      <>
        <Header />
        <MovieDetail />
        <Footer />
      </>
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
        <TVSeries />
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
];

// Combine all routes
const router = createBrowserRouter([...publicRoutes, adminRoutes]);

export default router;
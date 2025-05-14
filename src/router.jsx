import React from 'react';
import { Outlet, createBrowserRouter, Navigate } from "react-router-dom";
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
import AdminLayout from './Components/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import UserManagement from './pages/Admin/UserManagement';
import Movies from './pages/Admin/Movies/Movies';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return children;
};

// Admin Routes
const adminRoutes = {
  path: '/admin',
  element: (
    <ProtectedRoute isAdmin={true}>
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: 'dashboard',
      element: <Dashboard />,
    },
    {
      path: 'users',
      element: <UserManagement />,
    },
    {
      path: 'movies',
      element: <Movies />,
    },
    // Thêm các route admin khác ở đây
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
];

// Combine all routes
const router = createBrowserRouter([...publicRoutes, adminRoutes]);

export default router;

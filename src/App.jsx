import React from "react";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import FeedPage from "./Pages/FeedPage";
import ProfilePage from "./Pages/ProfilePage";
import SinglePostPage from "./Pages/SinglePostPage";
import AuthLayout from "./Layouts/AuthLayout";
import RegisterPage from "./Pages/RegisterPage";
import { Toaster } from "react-hot-toast";
import ProdectedRoute from "./Components/ProdectedRoute";
import AuthProdectedRoute from "./Components/AuthProdectedRoute";
import Following from "./Pages/Following";
import Settings from "./Pages/Settings";
import NotFoundPage from "./Pages/NotFoundPage";
function App() {
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {index: true, element:<ProdectedRoute><FeedPage /></ProdectedRoute>},
        {path: "profile", element:<ProdectedRoute><ProfilePage /></ProdectedRoute>},
        {path: "Following", element:<ProdectedRoute><Following /></ProdectedRoute>},
        {path: "Settings", element:<ProdectedRoute><Settings /></ProdectedRoute>},
        {path: "single-post/:id", element:<ProdectedRoute><SinglePostPage /></ProdectedRoute>},
         { path: "*",element: <NotFoundPage />,}
      ],
    },
    {
  path: "auth",
  element: <AuthLayout />,
  children: [
    { index: true, element: <AuthProdectedRoute><Navigate to="login" /></AuthProdectedRoute> },
    { path: ":mode", element: <AuthProdectedRoute><RegisterPage /></AuthProdectedRoute> }, // هنا جعلنا المسار متغير
  ],
},
  ]);
  return (
    <>
    
    <Toaster position="top-center" />
      <RouterProvider router={Router}></RouterProvider>
    </>
  );
}

export default App;

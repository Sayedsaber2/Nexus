import { AuthConText } from "@/Context/AuthConText";
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProdectedRoute({children }) {
    const{isLogged_in}=useContext(AuthConText)
    
  return isLogged_in ? children : <Navigate to="/auth/login" />
}
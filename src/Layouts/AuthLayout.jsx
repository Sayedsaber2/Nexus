import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return <>
  <div className=" min-h-screen  bg-[#0A0A0F]">

  <Outlet/>
  </div>
  </>;
}

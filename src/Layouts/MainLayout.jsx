import React from "react";

import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";
import Navbar from "@/Components/Navbar";

export default function MainLayout() {
  return <>
  <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <main className="min-h-[calc(100vh-140px)]">
        <Outlet />
      </main>

      <Footer />
    </div>
  </>;
}

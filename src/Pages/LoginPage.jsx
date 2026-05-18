import React from "react";

import { UserPlus, Zap} from "lucide-react";
import { Link } from "react-router-dom";
export default function LoginPage() {
  return <div className="min-h-screen  text-white flex items-center justify-center ">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT SIDE */}
          <div className="hidden md:flex h-130 rounded-2xl bg-[#12121A] border border-white/10 relative overflow-hidden">
            {/* 🔥 Gradient Glow */}
            <div className="absolute w-72 h-72 bg-[#7C5CFC] blur-3xl opacity-20 -top-10 -left-10"></div>
            <div className="absolute w-72 h-72 bg-[#FC5CA8] blur-3xl opacity-20 bottom-0 right-0"></div>
  
            {/* 🌌 Background subtle pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-size-[20px_20px]"></div>
  
            {/* CONTENT */}
            <div className="relative z-10 flex flex-col justify-between w-full p-8">
              {/* TOP TEXT */}
              <div>
                <h2 className="text-2xl font-bold leading-snug">
                  Connect. Share.
                  <br />
                  <span className="bg-linear-to-r from-[#7C5CFC] to-[#FC5CA8] bg-clip-text text-transparent">
                    Explore Nexora
                  </span>
                </h2>
  
                <p className="text-gray-400 text-sm mt-3 max-w-xs">
                  Join a modern social platform where your ideas meet the world.
                </p>
              </div>
  
              {/* ✨ FEATURES */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#7C5CFC]/10 text-[#7C5CFC]">
                    ⚡
                  </div>
                  <p className="text-sm text-gray-300">
                    Fast & real-time interactions
                  </p>
                </div>
  
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#FC5CA8]/10 text-[#FC5CA8]">
                    💬
                  </div>
                  <p className="text-sm text-gray-300">
                    Seamless messaging experience
                  </p>
                </div>
  
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#00E5CC]/10 text-[#00E5CC]">
                    🌍
                  </div>
                  <p className="text-sm text-gray-300">Connect globally</p>
                </div>
              </div>
  
              {/* 🔁 SWITCH BUTTON */}
              <button
                className="self-start px-5 py-2 rounded-lg border border-white/10 
        hover:border-[#7C5CFC] hover:text-[#7C5CFC] 
        transition"
              >
                Already have an account? Login
              </button>
            </div>
          </div>
  
          {/* RIGHT SIDE (FORM) */}
          <div className=" flex justify-center">
            {/* CARD */}
            <div className="relative w-full max-w-md bg-[#12121A] rounded-2xl border border-white/10 shadow-xl py-6 px-4">
              <div className="absolute top-[-0.5px] left-0 w-full h-0.5 overflow-hidden">
                <div className="w-1/2 mx-auto h-full bg-linear-to-l from-transparent via-[#FC5CA8] to-[#7C5CFC] animate-pulse" />
              </div>
              {/* HEADER */}
  
              <div className="text-center ">
                <div className="flex items-center justify-center gap-2 mb-4">
                  {/* ICON BOX */}
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center 
                    bg-linear-to-br from-[#7C5CFC] to-[#FC5CA8]"
                  >
                    <Zap className="text-white w-4 h-4" />
                  </div>
  
                  {/* LOGO TEXT */}
                  <h1
                    className="text-2xl font-bold gap-2 bg-linear-to-br from-[#7C5CFC] to-[#FC5CA8] bg-clip-text text-transparent"
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      letterSpacing: "-1px",
                    }}
                  >
                    NEXORA
                  </h1>
                </div>
                <div className="flex bg-[#0F0F12] border border-white/10 rounded-lg mb-6 w-full px-1 py-1 gap-0.5">
                  <Link to="/login" className="text-sm font-semibold cursor-pointer transition duration-200 text-[#7C5CFC] flex-1 p-3 bg-[#7c5cfc33] rounded-lg">
                    Sign In
                  </Link>
                  <Link to="/register" className="text-sm font-semibold cursor-pointer transition duration-200 text-[#7C5CFC] flex-1 p-3 bg-[#7c5cfc33] rounded-lg">
                    Sign Up
                  </Link>
                </div>
              </div>
              <div className="text-center  mb-6">
                {/* Welcome + Icon */}
                <div className="flex  text-2xl items-center justify-center gap-2">
                    <UserPlus className="w-5 h-5 text-[#7C5CFC]" />
                  <h2 className=" font-semibold text-white ">
                    Welcome back
                  </h2>
  
  
                </div>
  
                
              <p className="text-gray-400 text-sm mt-2">
                Enter your information to register
              </p>
              </div>
              {/* FORM */}
              <div className="space-y-4">
                
  
                <input
                  type="email"
                  placeholder="Email address"
                  className=" text-sm w-full px-4 py-3 rounded-lg bg-[#0A0A0F] border border-white/10 
                  text-white placeholder:text-gray-500 
                  outline-none focus:border-[#7C5CFC] focus:ring-1 focus:ring-[#7C5CFC]/80"
                />
  
                
  
                <input
                  type="password"
                  placeholder="Password"
                  className="text-sm w-full px-4 py-2 rounded-lg bg-[#0A0A0F] border border-white/10 
                  text-white placeholder:text-gray-500 
                  outline-none focus:border-[#7C5CFC] focus:ring-1 focus:ring-[#7C5CFC]/80"
                />
                
                <button
                  className="w-full mt-4 py-3 rounded-lg font-semibold 
                  bg-linear-to-br from-[#7C5CFC] to-[#FC5CA8] 
                  hover:opacity-90 transition 
                  shadow-lg shadow-purple-500/20"
                >
                  REGISTER NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>;
}

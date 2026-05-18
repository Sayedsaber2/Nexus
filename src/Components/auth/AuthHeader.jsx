import {Zap} from "lucide-react";
import React from "react";

export default function AuthHeader({isLogin, navigate}) {
  return (
    <>
      <div className="absolute top-[-0.5px] left-0 w-full h-0.75 overflow-hidden ">
        <div className="w-1/2 mx-auto h-full bg-linear-to-l from-transparent via-[#FC5CA8] to-[#7C5CFC] animate-pulse" />
      </div>
      <div className="text-center ">
        <div className="flex items-center justify-center gap-2 mb-6">
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
            NEXUS
          </h1>
        </div>
        <div className="flex bg-[#0F0F12] border border-white/10 rounded-lg mb-3 w-full px-1 py-1 gap-0.5">
          <button
            onClick={() => navigate("/auth/login")}
            className={`text-sm font-semibold cursor-pointer transition duration-100 flex-1 p-2.75  ${isLogin ? "bg-[#7c5cfc33] text-[#7C5CFC]" : "text-gray-400"} rounded-lg`}
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/auth/register")}
            className={`text-sm font-semibold cursor-pointer transition duration-100 flex-1 p-2.75  ${!isLogin ? "bg-[#7c5cfc33] text-[#7C5CFC]" : "text-gray-400"} rounded-lg`}
          >
            Sign Up
          </button>
        </div>
      </div>
      
    </>
  );
}

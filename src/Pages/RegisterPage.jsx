import React from "react";
import {
  User,
  UserPlus,
} from "lucide-react";
import {useState} from "react";
import {motion} from "framer-motion";
import backGround from "../assets/auth.jpg";
import {useParams, useNavigate} from "react-router-dom";
import LeftSide from "../Components/auth/LeftSide";
import AuthHeader from "../Components/auth/AuthHeader";
import AuthForm from "../Components/auth/AuthForm";
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {mode} = useParams();
  const navigate = useNavigate();
  const isLogin = mode === "login";
  const isRegister = mode === "register";
  return (
    <div className="  min-h-screen text-white flex items-center justify-center ">
      <div className="absolute inset-0">
        <img
          src={backGround}
          alt="auth"
          className="w-full h-full object-cover object-[10%_center] "
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent" />
      </div>
      <div className=" relative z-10 w-full px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE */}
        <LeftSide />
        {/* RIGHT SIDE (FORM) */}
        <div className=" flex justify-center w-full md:justify-end md:pr-8 mb-2 md:mb-0">
          {/* CARD */}

          <div className=" relative w-full max-w-sm bg-[#12121A]/80 backdrop-blur-lg shadow-[0_0_60px_rgba(124,92,252,0.25)] rounded-2xl border border-white/10 pt-6 pb-4 px-4">
            {/* HEADER */}
            <AuthHeader isLogin={isLogin} navigate={navigate} />

            <motion.div
              key={mode} // مهم جدًا عشان يعمل re-render
              initial={{opacity: 0, y: -30}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, ease: "easeOut"}}
              className=" "
            >
              <div className="text-center mb-4">
                {/* Welcome + Icon */}
                <div className="flex  text-2xl items-center justify-center gap-2">
                  {isLogin ? (
                    <User className="w-5 h-5 text-[#7C5CFC]" />
                  ) : (
                    <UserPlus className="w-5 h-5 text-[#7C5CFC]" />
                  )}
                  <h2 className=" font-semibold text-white ">
                    {isLogin ? "Welcome back" : "Create account"}
                  </h2>
                </div>

                <p className="text-gray-400 text-sm mt-2">
                  {isLogin
                    ? "Sign in to your Nexus account"
                    : "Enter your information to register"}
                </p>
              </div>
              {/* FORM */}

              <AuthForm
                navigate={navigate}
                isLogin={isLogin}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showConfirm={showConfirm}
                setShowConfirm={setShowConfirm}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

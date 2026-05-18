import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      
      <div className="text-center space-y-6">

        {/* ICON */}
        <div className="flex items-center justify-center">
          <div
            className="
              w-16 h-16 rounded-2xl
              flex items-center justify-center
              bg-linear-to-br from-[#8B5CF6] to-[#FC5CA8]
              shadow-[0_0_25px_rgba(139,92,246,0.35)]
            "
          >
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* TEXT */}
        <h1 className="text-5xl font-bold">404</h1>

        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* BUTTON */}
        <Link
          to="/"
          className="
            inline-flex items-center justify-center
            px-5 py-2
            rounded-xl
            text-sm font-medium
            bg-linear-to-r from-[#8B5CF6] to-[#FC5CA8]
            text-white
            hover:opacity-90
            transition
          "
        >
          Go back home
        </Link>

      </div>
    </div>
  );
}
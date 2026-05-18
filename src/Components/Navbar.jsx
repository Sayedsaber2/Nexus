import React, {useContext} from "react";
import {NavLink, Link, useNavigate} from "react-router-dom";
import {
  Zap,
  Bell,
  MessageCircle,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import ThemeToggle from "./ThemeToggle";
import {AuthConText} from "@/Context/AuthConText";

export default function Navbar() {
  const {setIsLogged_in, userData} = useContext(AuthConText);

  const navigate = useNavigate();
  function LogOut() {
    // Implement your logout logic here
    localStorage.removeItem("token");
    setIsLogged_in(false);
    // navigate("/auth/login");
  }
  return (
    <div
      className="
      sticky top-0 z-50
      w-full px-6 py-3
      flex items-center justify-between
      bg-background/70
      backdrop-blur-xl
      border-b border-border
      text-foreground
      transition-colors duration-300
    "
    >
      {/* LEFT - LOGO */}
      <Link to="/" className="flex items-center gap-3">
        <div
          className="
          w-10 h-10 rounded-lg
          flex items-center justify-center
          bg-linear-to-br from-[#8B5CF6] to-[#FC5CA8]
          shadow-[0_0_20px_rgba(139,92,246,0.35)]
        "
        >
          <Zap className="text-white w-5 h-5" />
        </div>

        <h1
          className="
          text-2xl font-bold
          bg-linear-to-br from-[#8B5CF6] to-[#FC5CA8]
          bg-clip-text text-transparent
        "
          style={{fontFamily: "Orbitron, sans-serif"}}
        >
          NEXUS
        </h1>
      </Link>

      {/* CENTER - NAV LINKS */}
      <div className="inline-flex items-center gap-4 font-semibold">
        <NavLink
          to="/"
          className={({isActive}) =>
            `
            inline-flex items-center justify-center
            px-4 py-1.5 rounded-full
            border text-sm
            transition duration-300

            ${
              isActive
                ? `
                bg-primary
                border-primary
                text-primary-foreground
                shadow-[0_0_16px_rgba(139,92,246,0.35)]
              `
                : `
                bg-card
                border-border
                text-muted-foreground
                hover:border-primary
                hover:text-foreground
              `
            }
          `
          }
        >
          For you
        </NavLink>

        <NavLink
          to="/Following"
          className={({isActive}) =>
            `
            inline-flex items-center justify-center
            px-4 py-1.5 rounded-full
            border text-sm
            transition duration-300

            ${
              isActive
                ? `
                bg-primary
                border-primary
                text-primary-foreground
                shadow-[0_0_16px_rgba(139,92,246,0.35)]
              `
                : `
                bg-card
                border-border
                text-muted-foreground
                hover:border-primary
                hover:text-foreground
              `
            }
          `
          }
        >
          Following
        </NavLink>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {/* NOTIFICATION */}
        <div
          className="
          relative
          w-9 h-9 rounded-full
          flex items-center justify-center
          border border-border
          bg-card
          hover:border-primary
          hover:shadow-[0_0_14px_rgba(139,92,246,0.25)]
          transition duration-300
          cursor-pointer
          group
        "
        >
          <Bell
            className="
            
            w-5 h-5
            text-primary
            group-hover:text-[#A78BFA]
            transition
          "
          />
          {userData?.notificationsCount > 0 && (
            <span
              className="
    absolute -top-1 -right-1
    min-w-5 h-5 px-1
    rounded-full
    bg-pink-500
    text-white
    text-[10px]
    font-bold
    flex items-center justify-center
    border-2 border-background
  "
            >
              {userData?.notificationsCount}
            </span>
          )}
        </div>

        {/* MESSAGE */}
        <div
          className="
          relative
          w-9 h-9 rounded-full
          flex items-center justify-center
          border border-border
          bg-card
          hover:border-primary
          hover:shadow-[0_0_14px_rgba(139,92,246,0.25)]
          transition duration-300
          cursor-pointer
          group
        "
        >
          <MessageCircle
            className="
            w-5 h-5
            text-primary
            group-hover:text-[#A78BFA]
            transition
          "
          />
          <span
            className="
    absolute -top-1 -right-1
    min-w-5 h-5 px-1
    rounded-full
    bg-pink-500
    text-white
    text-[10px]
    font-bold
    flex items-center justify-center
    border-2 border-background
  "
          >
            2
          </span>
        </div>

        {/* PROFILE */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <img
              src={userData?.photo}
              alt="profile"
              className="
              w-9 h-9 rounded-full
              object-cover
              border border-border
              hover:border-primary
              transition duration-300
              cursor-pointer
            "
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="
            w-52 p-2 rounded-2xl
            bg-card/95
            backdrop-blur-xl
            border border-border
            text-card-foreground
            shadow-2xl
          "
          >
            <div className="px-3 py-2 border-b border-border mb-1">
              <p className="text-sm font-semibold text-foreground">
                {userData?.name}
              </p>
            </div>
            <Link to="/Profile">
              <DropdownMenuItem
                className="
                group flex items-center gap-2
                px-3 py-2 rounded-xl
                cursor-pointer transition

                text-muted-foreground
                hover:bg-accent
                hover:text-accent-foreground
                focus:bg-accent
                focus:text-accent-foreground
              "
              >
                <UserIcon
                  className="
                  w-4 h-4
                  stroke-muted-foreground
                  group-hover:stroke-accent-foreground
                  transition
                "
                />
                Profile
              </DropdownMenuItem>
            </Link>

            <Link to="/settings">
              <DropdownMenuItem
                className="
                group flex items-center gap-2
                px-3 py-2 rounded-xl
                cursor-pointer transition

                text-muted-foreground
                hover:bg-accent
                hover:text-accent-foreground
                focus:bg-accent
                focus:text-accent-foreground
              "
              >
                <SettingsIcon
                  className="
                  w-4 h-4
                  stroke-muted-foreground
                  group-hover:stroke-accent-foreground
                  transition
                "
                />
                Settings
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator className="bg-border my-1" />

            <DropdownMenuItem
              onClick={LogOut}
              className="
              group flex items-center gap-2
              px-3 py-2 rounded-xl
              cursor-pointer transition

              text-red-400
              hover:bg-red-500/10
              hover:text-red-300
              focus:bg-red-500/10
              focus:text-red-300
            "
            >
              <LogOutIcon
                className="
                w-4 h-4
                stroke-red-400
                group-hover:stroke-red-300
                transition
              "
              />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

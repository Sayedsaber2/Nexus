import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Zap,
  Bell,
  MessageCircle,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
  ChevronDown,
} from "lucide-react";
 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
 
import ThemeToggle from "./ThemeToggle";
import { AuthConText } from "@/Context/AuthConText";
 
export default function Navbar() {
  const { setIsLogged_in, userData } = useContext(AuthConText);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  function LogOut() {
    localStorage.removeItem("token");
    setIsLogged_in(false);
  }
 
  return (
    <div
      className={`
        sticky top-0 z-50
        w-full px-4 pt-3 pb-2
        flex justify-center
        transition-all duration-300
        ${scrolled ? "bg-background/80 backdrop-blur-xl" : "bg-transparent"}
      `}
    >
      {/* ── Floating navbar ── */}
      <nav
        className={`
          w-full max-w-5xl
          flex items-center justify-between
          px-3 py-2
          rounded-2xl
          bg-card/80
          backdrop-blur-xl
          border border-border
          transition-all duration-300
          ${scrolled
            ? "shadow-[0_4px_32px_rgba(124,92,252,0.10)]"
            : "shadow-[0_2px_16px_rgba(124,92,252,0.06)]"
          }
        `}
      >
 
        {/* ── LEFT — Logo ── */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div
            className="
              w-9 h-9 rounded-xl
              flex items-center justify-center
              shadow-[0_0_16px_rgba(124,92,252,0.35)]
              group-hover:shadow-[0_0_22px_rgba(124,92,252,0.55)]
              group-hover:scale-[1.06]
              transition-all duration-300
            "
            style={{ background: "linear-gradient(135deg, var(--gradient-primary-from), var(--gradient-primary-to))" }}
          >
            <Zap className="text-white w-4.5 h-4.5" strokeWidth={2.5} />
          </div>
 
          <h1
            className="text-[16px] font-bold tracking-widest"
            style={{
              fontFamily: "Orbitron, sans-serif",
              background: "linear-gradient(to right, var(--gradient-primary-from), var(--gradient-primary-to))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            NEXUS
          </h1>
        </Link>
 
        {/* ── CENTER — Segmented nav ── */}
        <div
          className="
            flex items-center gap-0.5 p-1
            rounded-xl
            bg-muted
            border border-border
          "
        >
          {[
            { to: "/", label: "For you", end: true },
            { to: "/Following", label: "Following" },
          ].map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `
                  px-5 py-1.5
                  rounded-[10px]
                  text-sm font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? `
                        bg-card
                        text-foreground
                        shadow-sm
                        border border-border
                      `
                      : `
                        text-muted-foreground
                        hover:text-foreground
                        hover:bg-card/60
                      `
                  }
                `
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
 
        {/* ── RIGHT — Actions ── */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
 
          {/* Notification */}
          <NavIconBtn
            badge={userData?.notificationsCount}
            icon={<Bell className="w-4.25 h-4.25 text-primary" />}
          />
 
          {/* Message */}
          <NavIconBtn
            badge={3}
            icon={<MessageCircle className="w-4.25 h-4.25 text-primary" />}
          />
 
          {/* Divider */}
          <span className="block w-px h-5 bg-border mx-0.5" />
 
          {/* ── Profile dropdown ── */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="
                  group
                  flex items-center gap-2
                  pl-1.5 pr-2.5 py-1.5
                  rounded-xl
                  border border-border
                  bg-card
                  hover:border-primary/50
                  hover:bg-accent
                  active:scale-[0.98]
                  transition-all duration-200
                  outline-none focus-visible:ring-2 focus-visible:ring-ring
                "
              >
                <img
                  src={userData?.photo}
                  alt={userData?.name}
                  className="
                    w-6 h-6 rounded-lg
                    object-cover
                    ring-1 ring-border
                  "
                />
                <span className="text-[13px] font-medium text-foreground max-w-20 truncate">
                  {userData?.name?.split(" ")[0]}
                </span>
                <ChevronDown
                  className="
                    w-3.5 h-3.5 text-muted-foreground
                    group-data-[state=open]:rotate-180
                    transition-transform duration-200
                  "
                />
              </button>
            </DropdownMenuTrigger>
 
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="
                w-52 p-1.5
                rounded-2xl
                bg-popover
                border border-border
                shadow-xl shadow-black/8
              "
            >
              {/* User info header */}
              <div className="px-3 py-2.5 mb-0.5">
                <p className="text-[13px] font-semibold text-foreground leading-none">
                  {userData?.name}
                </p>
                {userData?.email && (
                  <p className="text-[11px] text-muted-foreground mt-1 truncate">
                    {userData.email}
                  </p>
                )}
              </div>
 
              <DropdownMenuSeparator className="bg-border mb-0.5" />
 
              <Link to="/Profile">
                <DropdownMenuItem
                  className="
                    flex items-center gap-2.5
                    px-3 py-2 rounded-xl
                    text-[13px] text-muted-foreground
                    cursor-pointer
                    hover:bg-accent hover:text-accent-foreground
                    focus:bg-accent focus:text-accent-foreground
                    transition-colors
                  "
                >
                  <UserIcon className="w-3.75 h-3.75 shrink-0" />
                  Profile
                </DropdownMenuItem>
              </Link>
 
              <Link to="/settings">
                <DropdownMenuItem
                  className="
                    flex items-center gap-2.5
                    px-3 py-2 rounded-xl
                    text-[13px] text-muted-foreground
                    cursor-pointer
                    hover:bg-accent hover:text-accent-foreground
                    focus:bg-accent focus:text-accent-foreground
                    transition-colors
                  "
                >
                  <SettingsIcon className="w-3.75 h-3.75 shrink-0" />
                  Settings
                </DropdownMenuItem>
              </Link>
 
              <DropdownMenuSeparator className="bg-border mt-0.5 mb-0.5" />
 
              <DropdownMenuItem
                onClick={LogOut}
                className="
                  flex items-center gap-2.5
                  px-3 py-2 rounded-xl
                  text-[13px] text-destructive
                  cursor-pointer
                  hover:bg-destructive/10 hover:text-destructive
                  focus:bg-destructive/10 focus:text-destructive
                  transition-colors
                "
              >
                <LogOutIcon className="w-3.75 h-3.75 shrink-0" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
}
 
/* ── Icon button with optional badge ── */
function NavIconBtn({ icon, badge }) {
  const count = Number(badge) || 0;
 
  return (
    <button
      className="
        relative
        w-9 h-9 rounded-xl
        flex items-center justify-center
        bg-card
        border border-border
        hover:border-primary/50
        hover:bg-accent
        hover:scale-[1.06]
        active:scale-95
        transition-all duration-200
        cursor-pointer
        group
        outline-none focus-visible:ring-2 focus-visible:ring-ring
      "
    >
      <span className="group-hover:text-primary transition-colors duration-200">
        {icon}
      </span>
 
      {count > 0 && (
        <span
          className="
            absolute -top-2 -right-3
            min-w-5 h-5 px-1
            rounded-full
            text-white text-[10px] font-bold
            flex items-center justify-center
            border-2 border-background
            leading-none
          "
          style={{ background: "linear-gradient(to right, var(--gradient-primary-from), var(--gradient-primary-to))" }}
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
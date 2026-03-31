import { NavLink, Outlet, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Home, Zap, Calendar, Briefcase, ShoppingBag, MessageCircle, Bell, User, Search, Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; 

const navItems = [
  { to: "/app", icon: Home, label: "Feed", end: true },
  { to: "/app/pulse", icon: Zap, label: "Pulse" },
  { to: "/app/events", icon: Calendar, label: "Events" },
  { to: "/app/opportunities", icon: Briefcase, label: "Opportunities" },
  { to: "/app/marketplace", icon: ShoppingBag, label: "Marketplace" },
  { to: "/app/messages", icon: MessageCircle, label: "Messages" },
];

const glassPanel =
  "border border-white/10 bg-white/5 shadow-xl backdrop-blur-lg";

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate(); // For redirect after logout

const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    toast.success("Logged out successfully!");
    navigate("/"); // Redirect to landing page
  } catch (error: any) {
    toast.error(error.message || "Failed to log out");
  }
};

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-gradient-to-br from-[#0b1120] via-[#1e293b] to-[#020617] text-white">
      {/* Atmospheric background */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <div className="absolute -left-[15%] -top-[10%] h-[min(85vw,560px)] w-[min(85vw,560px)] rounded-full bg-indigo-500/30 blur-[128px]" />
        <div className="absolute -right-[20%] top-[15%] h-[min(75vw,500px)] w-[min(75vw,500px)] rounded-full bg-violet-600/25 blur-[110px]" />
        <div className="absolute left-1/2 top-[42%] h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-1/2 h-[min(70vw,480px)] w-[min(110vw,720px)] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[100px]" />
      </div>

      {/* Sidebar — desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden w-[17rem] flex-col lg:flex",
          glassPanel,
          "rounded-none border-y-0 border-l-0 border-r-white/10",
        )}
      >
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-indigo-500 shadow-lg shadow-indigo-500/35 ring-1 ring-white/10">
            <span className="text-lg font-bold leading-none text-white">C</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">CampusPulse</span>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pb-4">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Navigate</p>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-[1.02]"
                    : "text-gray-400 hover:bg-white/10 hover:text-white hover:scale-[1.02]",
                )
              }
            >
              <item.icon className="h-[1.125rem] w-[1.125rem] shrink-0" aria-hidden />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={cn("mt-auto space-y-1 border-t border-white/10 p-4")}>
          <NavLink
            to="/app/profile"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200",
                isActive
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-[1.02]"
                  : "text-gray-400 hover:bg-white/10 hover:text-white hover:scale-[1.02]",
              )
            }
          >
            <User className="h-[1.125rem] w-[1.125rem] shrink-0" aria-hidden />
            Profile
          </NavLink>
          <button
  type="button"
  onClick={handleLogout}  // <-- attach the logout function here
  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-gray-400 transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-[1.02]"
>
  <LogOut className="h-[1.125rem] w-[1.125rem] shrink-0" aria-hidden />
  Log out
</button>
        </div>
      </aside>

      {/* Main column */}
      <div className="relative z-10 flex min-h-screen flex-1 flex-col lg:ml-[17rem]">
        {/* Top navbar */}
        <header
          className={cn(
            "sticky top-0 z-30 flex h-[4.5rem] shrink-0 items-center gap-4 border-b border-white/10 px-4 sm:px-6 lg:px-8",
            "bg-white/5 backdrop-blur-lg shadow-xl",
          )}
        >
          <div className="flex w-full items-center gap-4">
            <div className="min-w-0 flex-1 max-w-md">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                  aria-hidden
                />
                <Input
                  placeholder="Search campus..."
                  className={cn(
                    "h-12 rounded-xl border-white/10 bg-white/10 pl-11 text-sm text-white",
                    "placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-transparent",
                  )}
                />
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="relative h-11 w-11 rounded-xl border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10 hover:text-white transition-all duration-200 hover:scale-105"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.7)]" />
              </Button>
              <NavLink to="/app/profile" className="shrink-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 shadow-lg ring-1 ring-white/10 transition-all duration-200 hover:bg-white/10 hover:scale-105">
                  <div className="h-9 w-9 rounded-lg bg-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
                    AP
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        </header>

        <main className="relative flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12 pb-28 lg:pb-12">
          <Outlet />
        </main>
      </div>

      {/* Bottom nav — mobile */}
      <nav
        className={cn(
          "fixed bottom-0 inset-x-0 z-40 flex h-[4.5rem] items-center justify-around border-t border-white/10 px-2 lg:hidden",
          "bg-white/5 backdrop-blur-lg shadow-xl pb-[env(safe-area-inset-bottom)]",
        )}
      >
        {navItems.slice(0, 5).map((item) => {
          const isActive = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl py-2 transition-all duration-200"
            >
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-110"
                    : "text-gray-400 hover:bg-white/10",
                )}
              >
                <item.icon className="h-5 w-5" aria-hidden />
              </span>
              <span
                className={cn(
                  "truncate text-[10px] font-bold tracking-tight",
                  isActive ? "text-indigo-300" : "text-gray-500",
                )}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* FAB — mobile */}
      {location.pathname !== "/app/profile" && (
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-[calc(4.5rem+1rem+env(safe-area-inset-bottom))] right-4 z-50 h-14 w-14 rounded-2xl bg-indigo-500 text-white shadow-xl shadow-indigo-500/30 transition-all duration-200 hover:scale-110 active:scale-95 border border-white/20 lg:hidden"
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default AppLayout;

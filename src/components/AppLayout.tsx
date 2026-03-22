import { NavLink, Outlet, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Home, Zap, Calendar, Briefcase, ShoppingBag, MessageCircle, Bell, User, Search, Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/app", icon: Home, label: "Feed", end: true },
  { to: "/app/pulse", icon: Zap, label: "Pulse" },
  { to: "/app/events", icon: Calendar, label: "Events" },
  { to: "/app/opportunities", icon: Briefcase, label: "Opportunities" },
  { to: "/app/marketplace", icon: ShoppingBag, label: "Marketplace" },
  { to: "/app/messages", icon: MessageCircle, label: "Messages" },
];

const AppLayout = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r bg-card fixed inset-y-0 left-0 z-40">
        <div className="p-5 border-b">
          <img src={logo} alt="CampusPulse" className="h-9 w-auto" />
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t space-y-1">
          <NavLink
            to="/app/profile"
            className={({ isActive }) =>
              cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground")
            }
          >
            <User className="h-5 w-5" />
            Profile
          </NavLink>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors w-full">
            <LogOut className="h-5 w-5" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b h-14 flex items-center px-4 lg:px-6 gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search campus..." className="pl-10 bg-muted border-0 h-9" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <NavLink to="/app/profile">
              <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
                AP
              </div>
            </NavLink>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-6 pb-24 lg:pb-6">
          <Outlet />
        </main>
      </div>

      {/* Bottom nav - Mobile */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-card border-t flex justify-around items-center h-16 px-2">
        {navItems.slice(0, 5).map((item) => {
          const isActive = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);
          return (
            <NavLink key={item.to} to={item.to} end={item.end} className="flex flex-col items-center gap-0.5 py-1">
              <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
              <span className={cn("text-[10px] font-medium", isActive ? "text-primary" : "text-muted-foreground")}>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* FAB */}
      <Button variant="hero" size="icon" className="lg:hidden fixed bottom-20 right-4 z-50 h-12 w-12 rounded-full shadow-xl">
        <Plus className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default AppLayout;

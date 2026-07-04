import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, LogOut, User, Bell, Settings } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import { useAuthStore } from "../../store/authStore";
import api from "../../services/api";

export function TopNav() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (e) {
      console.error(e);
    } finally {
      clearAuth();
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border bg-navbar text-navbar-foreground px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <button 
          className="sm:hidden p-2 -ml-2 rounded-md hover:bg-muted text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Toggle sidebar menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        
        <button className="relative p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive"></span>
        </button>

        <div className="relative">
        <button 
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          data-state={showProfileMenu ? "open" : "closed"}
          aria-haspopup="menu"
          aria-label="Open account menu"
          className="flex items-center gap-2 rounded-full border border-border p-1 pl-2 hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
            <span className="text-sm font-medium hidden sm:block max-w-[100px] truncate">
              {user?.name || "User"}
            </span>
            <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User className="h-4 w-4" />
            </div>
          </button>

          {showProfileMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 rounded-md border border-border bg-popover p-1 shadow-medium z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-2 py-1.5 text-sm font-medium text-foreground border-b border-border mb-1">
                  My Account
                </div>
                <Link
                  to="/profile"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    handleLogout();
                  }}
                  className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

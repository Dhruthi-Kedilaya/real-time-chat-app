import { LogOut, MessageSquare, Moon, PlusCircle, Settings, Sun, User } from "lucide-react";
import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { usePersStore } from "../store/usePersStore";

const Navbar = () => {
  const { activeTab } = usePersStore();
  const { authUser, logOut } = useAuthStore();
  const { themes, setThemes } = useThemeStore();
  return (
    <div className="bg-base-200 px-4 py-4 shadow-md border-b border-base-100">
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

    {/* Row 1: Logo */}
    <div className="flex items-center gap-3">
      <MessageSquare className="size-8 text-primary" />
      <a href="/" className="text-2xl font-semibold text-primary">
        ChatterBox
      </a>
    </div>

    {/* Controls */}
    <div className="flex flex-wrap items-center gap-3">
      {/* New Group (conditional) */}
      {activeTab === "groups" && (
        <a
          href="/create-group"
          className="flex items-center gap-1 p-2 rounded-lg bg-base-200 hover:text-primary transition"
        >
          <PlusCircle className="size-5" />
          <span>New Group</span>
        </a>
      )}

      {/* Theme toggle */}
      <button
        className="flex items-center gap-1 p-2 rounded-lg bg-base-200 hover:text-primary transition"
        onClick={() => setThemes(themes === "light" ? "dark" : "light")}
      >
        {themes === "light" ? <Moon className="size-5" /> : <Sun className="size-5" />}
        <span>{themes === "light" ? "Dark" : "Light"}</span>
      </button>

      {/* Profile */}
      {authUser && (
        <a
          href="/profile"
          className="flex items-center gap-1 p-2 rounded-lg bg-base-200 hover:text-primary transition"
        >
          <User className="size-5" />
          <span>Profile</span>
        </a>
      )}

      {/* Settings */}
      <a
        href="/settings"
        className="flex items-center gap-1 p-2 rounded-lg bg-base-200 hover:text-primary transition"
      >
        <Settings className="size-5" />
        <span>Settings</span>
      </a>

      {/* Logout */}
      {authUser && (
        <button
          className="flex items-center gap-1 p-2 rounded-lg bg-base-200 hover:text-primary transition"
          onClick={logOut}
        >
          <LogOut className="size-5" />
          <span>Logout</span>
        </button>
      )}
    </div>
  </div>
</div>

  );
};

export default Navbar;

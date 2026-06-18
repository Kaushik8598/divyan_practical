"use client";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/features/theme/uiSlice";
import { logout } from "@/features/auth/authSlice";
import { RootState } from "@/store";
import { Moon, Sun, LogOut, User } from "lucide-react";

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const theme = useSelector((state: RootState) => state.ui.theme);

  return (
    <header className="h-16 bg-white dark:bg-surface border-b border-gray-200 dark:border-borderDark flex items-center justify-between px-6">
      <div className="flex items-center">
        {/* Placeholder for future Sidebar Toggle if needed */}
      </div>

      <div className="flex items-center space-x-4">
        {/* Theme Toggle Button */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-primary" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-borderDark">
          <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-primary/20 flex items-center justify-center text-cyan-600 dark:text-primary shadow-[0_0_10px_rgba(0,243,255,0.2)]">
            <User className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-textMain hidden md:block">
            {user?.name || "Admin"}
          </span>
          <button
            onClick={() => dispatch(logout())}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors ml-2"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

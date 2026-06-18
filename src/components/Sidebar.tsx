"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { toggleSidebar } from "@/features/theme/uiSlice";
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Users,
  Settings,
  X,
} from "lucide-react";
import { useEffect } from "react";

const navItems = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Users", href: "/users", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);

  // Auto-close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 1024 && sidebarOpen) {
      dispatch(toggleSidebar());
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-surface border-r border-gray-200 dark:border-borderDark flex flex-col transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-borderDark shrink-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-textMain">
            Divyan{" "}
            <span className="text-cyan-500 dark:text-primary drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]">
              AI
            </span>
          </h2>
          {/* Mobile Close Button */}
          <button
            onClick={() => dispatch(toggleSidebar())}
            aria-label="Close Sidebar"
            className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-textMain transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-cyan-50 dark:bg-primary/10 text-cyan-600 dark:text-primary border border-cyan-100 dark:border-primary/30 shadow-[inset_0_0_10px_rgba(0,243,255,0.05)]"
                    : "text-gray-600 dark:text-textMuted hover:bg-gray-50 dark:hover:bg-borderDark/50"
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="font-medium truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

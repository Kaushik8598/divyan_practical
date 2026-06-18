"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { toggleTheme } from "@/features/theme/uiSlice";
import { Save, User, Bell, Monitor } from "lucide-react";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.ui.theme);
  const user = useSelector((state: RootState) => state.auth.user);

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    weeklyReports: false,
    securityLogs: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, dispatch to an API here
    alert("Settings configuration saved locally.");
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-textMain">
          System Settings
        </h1>
        <p className="text-gray-500 dark:text-textMuted">
          Configure your platform preferences and profile.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-white dark:bg-surface rounded-xl border border-gray-200 dark:border-borderDark overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-borderDark flex items-center space-x-2 bg-gray-50 dark:bg-background/50">
            <User className="w-5 h-5 text-gray-500 dark:text-textMuted" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-textMain">
              Profile Information
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="displayName"
                  className="block text-sm font-medium text-gray-700 dark:text-textMuted mb-1"
                >
                  Display Name
                </label>
                <input
                  id="displayName" // Added id
                  type="text"
                  defaultValue={user?.name || "Admin User"}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-background border border-gray-200 dark:border-borderDark rounded-lg focus:ring-2 focus:ring-cyan-500 dark:focus:ring-primary outline-none dark:text-textMain transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="emailAddress"
                  className="block text-sm font-medium text-gray-700 dark:text-textMuted mb-1"
                >
                  Email Address
                </label>
                <input
                  id="emailAddress" // Added id
                  type="email"
                  disabled
                  defaultValue={user?.email || "admin@divyan.ai"}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-borderDark/30 border border-gray-200 dark:border-borderDark rounded-lg outline-none text-gray-500 dark:text-textMuted cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white dark:bg-surface rounded-xl border border-gray-200 dark:border-borderDark overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-borderDark flex items-center space-x-2 bg-gray-50 dark:bg-background/50">
            <Monitor className="w-5 h-5 text-gray-500 dark:text-textMuted" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-textMain">
              Appearance
            </h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-textMain">
                  Dark Mode
                </p>
                <p className="text-sm text-gray-500 dark:text-textMuted">
                  Switch between high-contrast dark and light themes.
                </p>
              </div>
              <button
                type="button"
                onClick={() => dispatch(toggleTheme())}
                aria-label="Toggle Dark Mode"
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${
                  theme === "dark"
                    ? "bg-cyan-500 dark:bg-primary shadow-neon"
                    : "bg-gray-200 dark:bg-borderDark"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    theme === "dark" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-surface rounded-xl border border-gray-200 dark:border-borderDark overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-borderDark flex items-center space-x-2 bg-gray-50 dark:bg-background/50">
            <Bell className="w-5 h-5 text-gray-500 dark:text-textMuted" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-textMain">
              Notifications
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-textMain capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setNotifications({ ...notifications, [key]: !value })
                  }
                  aria-label={`Toggle ${key} notifications`}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${
                    value
                      ? "bg-cyan-500 dark:bg-primary shadow-neon"
                      : "bg-gray-200 dark:bg-borderDark"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-2.5 bg-cyan-600 dark:bg-primary text-white dark:text-background rounded-lg font-medium hover:bg-cyan-700 dark:hover:bg-primary-dark transition-colors shadow-sm dark:shadow-neon"
          >
            <Save className="w-5 h-5" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}

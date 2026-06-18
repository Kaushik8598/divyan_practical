"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error("Dashboard Error Caught:", error);
  }, [error]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-textMain mb-2">
        System Error Detected
      </h2>
      <p className="text-gray-500 dark:text-textMuted max-w-md mb-6">
        A critical module failed to load. Please attempt to re-initialize the
        interface.
      </p>
      <button
        onClick={() => reset()}
        className="flex items-center space-x-2 px-6 py-2 bg-cyan-600 dark:bg-primary text-white dark:text-background rounded-lg font-medium hover:bg-cyan-700 dark:hover:bg-primary-dark transition-colors shadow-sm dark:shadow-neon"
      >
        <RefreshCcw className="w-4 h-4" />
        <span>Re-initialize</span>
      </button>
    </div>
  );
}

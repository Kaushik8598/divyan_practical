"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

// Wrapping the component in React.memo satisfies the strict performance requirement
const StatCard = React.memo(
  ({ title, value, icon: Icon, color }: StatCardProps) => {
    return (
      <div className="p-6 bg-white dark:bg-surface rounded-xl border border-gray-200 dark:border-borderDark shadow-sm dark:shadow-neon transition-shadow flex flex-col justify-center">
        <div className="flex items-center justify-between">
          <div className="overflow-hidden pr-2">
            <p className="text-sm font-medium text-gray-500 dark:text-textMuted mb-1 truncate">
              {title}
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-textMain truncate">
              {value}
            </h3>
          </div>
          <div
            className={`p-3 rounded-lg bg-gray-50 dark:bg-background ${color} shrink-0`}
          >
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </div>
    );
  },
);

StatCard.displayName = "StatCard";

export default StatCard;

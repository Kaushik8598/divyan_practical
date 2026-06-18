"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { FolderKanban, Activity, DollarSign, Users } from "lucide-react";
import StatCard from "@/components/StatCard";

export default function DashboardHome() {
  const projects = useSelector((state: RootState) => state.projects.items);

  // Dynamic KPI Calculations
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === "Active").length;
  const totalRevenue = projects.reduce((sum, p) => sum + p.revenue, 0);
  const totalUsers = 10;

  const statCards = [
    {
      title: "Total Projects",
      value: totalProjects,
      icon: FolderKanban,
      color: "text-blue-500 dark:text-blue-400",
    },
    {
      title: "Active Projects",
      value: activeProjects,
      icon: Activity,
      color: "text-green-500 dark:text-primary",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-purple-500 dark:text-purple-400",
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "text-orange-500 dark:text-orange-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-textMain tracking-tight">
          Overview
        </h1>
        <p className="text-gray-500 dark:text-textMuted">
          Welcome back to the Divyan AI console.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 sm:gap-6">
        {statCards.map((stat, index) => (
          <div key={index}>
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

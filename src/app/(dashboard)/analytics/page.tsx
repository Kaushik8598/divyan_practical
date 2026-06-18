"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAnalyticsData } from "@/services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Activity, Users, FileText, TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalyticsData,
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 dark:border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Failed to load analytics data.</div>;
  }

  // Data Massaging for Charts
  const postsPerUser = data?.users
    .map((user: any) => ({
      name: user.username,
      posts: data.posts.filter((p: any) => p.userId === user.id).length,
    }))
    .slice(0, 8);

  const mockTimeData = [
    { name: "Jan", traffic: 4000, conversion: 2400 },
    { name: "Feb", traffic: 3000, conversion: 1398 },
    { name: "Mar", traffic: 2000, conversion: 9800 },
    { name: "Apr", traffic: 2780, conversion: 3908 },
    { name: "May", traffic: 1890, conversion: 4800 },
    { name: "Jun", traffic: 2390, conversion: 3800 },
  ];

  const kpis = [
    {
      title: "Total Registered Users",
      value: data?.users.length || 0,
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Total Content Generated",
      value: data?.posts.length || 0,
      icon: FileText,
      color: "text-green-500 dark:text-primary",
    },
    {
      title: "System Uptime",
      value: "99.9%",
      icon: Activity,
      color: "text-purple-500",
    },
    {
      title: "Growth Rate",
      value: "+24.5%",
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ];

  // Custom Tooltip Style for Dark Mode
  const tooltipStyle = {
    backgroundColor: "var(--color-surface, #11111a)",
    borderColor: "var(--color-borderDark, #1f2937)",
    color: "var(--color-textMain, #e2e8f0)",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-textMain">
          Analytics Overview
        </h1>
        <p className="text-gray-500 dark:text-textMuted">
          Real-time platform metrics and insights.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 sm:gap-6">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className="p-5 bg-white dark:bg-surface rounded-xl border border-gray-200 dark:border-borderDark shadow-sm dark:shadow-neon flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500 dark:text-textMuted mb-1">
                {kpi.title}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-textMain">
                {kpi.value}
              </h3>
            </div>
            <div
              className={`p-3 rounded-lg bg-gray-50 dark:bg-background ${kpi.color}`}
            >
              <kpi.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Generation Bar Chart */}
        <div className="bg-white dark:bg-surface p-5 rounded-xl border border-gray-200 dark:border-borderDark">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-textMain mb-6">
            User Content Generation
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={postsPerUser}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  itemStyle={{ color: "#00f3ff" }}
                />
                <Bar dataKey="posts" fill="#00f3ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Area Chart */}
        <div className="bg-white dark:bg-surface p-5 rounded-xl border border-gray-200 dark:border-borderDark">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-textMain mb-6">
            Traffic vs Conversion
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTimeData}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorConversion"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00f3ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="traffic"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorTraffic)"
                />
                <Area
                  type="monotone"
                  dataKey="conversion"
                  stroke="#00f3ff"
                  fillOpacity={1}
                  fill="url(#colorConversion)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

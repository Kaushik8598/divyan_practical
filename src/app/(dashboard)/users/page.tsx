"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchUsersData } from "@/services/api";
import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [sortBy, setSortBy] = useState("firstName");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const { data, isLoading } = useQuery({
    queryKey: ["users", page, debouncedSearch, sortBy, order],
    queryFn: () =>
      fetchUsersData({ page, search: debouncedSearch, sortBy, order }),
    placeholderData: keepPreviousData, // Prevents layout jump while loading next page
  });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setOrder("asc");
    }
    setPage(1); // Reset to first page on sort
  };

  const users = data?.users || [];
  const totalPages = data?.total ? Math.ceil(data.total / 10) : 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-textMain">
            User Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-textMuted mt-1">
            Manage system access and roles.
          </p>
        </div>
      </div>

      {/* Controls: Search */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-surface p-4 rounded-xl border border-gray-200 dark:border-borderDark">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-textMuted" />
          <input
            type="text"
            placeholder="Search users by name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // Reset page on new search
            }}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-background border border-gray-200 dark:border-borderDark rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-primary dark:text-textMain"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-surface rounded-xl border border-gray-200 dark:border-borderDark overflow-hidden shadow-sm dark:shadow-neon">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-background/50 border-b border-gray-200 dark:border-borderDark text-sm font-medium text-gray-500 dark:text-textMuted">
                <th
                  className="px-6 py-4 cursor-pointer hover:text-cyan-500 dark:hover:text-primary transition-colors"
                  onClick={() => handleSort("firstName")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Name</span>
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th
                  className="px-6 py-4 cursor-pointer hover:text-cyan-500 dark:hover:text-primary transition-colors"
                  onClick={() => handleSort("email")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Email</span>
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th
                  className="px-6 py-4 cursor-pointer hover:text-cyan-500 dark:hover:text-primary transition-colors"
                  onClick={() => handleSort("age")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Age</span>
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="px-6 py-4">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-borderDark">
              {isLoading && users.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-500 dark:text-textMuted"
                  >
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-500 dark:text-textMuted"
                  >
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                users.map((user: any) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 dark:hover:bg-borderDark/20 transition-colors text-sm text-gray-900 dark:text-textMain"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium flex items-center space-x-3">
                      {/* <img
                        src={user.image}
                        alt={user.firstName}
                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-borderDark"
                      /> */}
                      <Image
                        src={user.image}
                        alt={`${user.firstName}'s avatar`}
                        width={32}
                        height={32}
                        className="rounded-full bg-gray-200 dark:bg-borderDark"
                        unoptimized
                      />
                      <span>
                        {user.firstName} {user.lastName}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-textMuted">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-50 dark:bg-primary/10 text-cyan-700 dark:text-primary border border-cyan-100 dark:border-primary/20">
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-borderDark flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-textMuted">
            Showing page{" "}
            <span className="font-medium text-gray-900 dark:text-textMain">
              {page}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-900 dark:text-textMain">
              {totalPages}
            </span>
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-gray-200 dark:border-borderDark text-gray-600 dark:text-textMuted hover:bg-gray-50 dark:hover:bg-borderDark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="p-2 rounded-lg border border-gray-200 dark:border-borderDark text-gray-600 dark:text-textMuted hover:bg-gray-50 dark:hover:bg-borderDark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

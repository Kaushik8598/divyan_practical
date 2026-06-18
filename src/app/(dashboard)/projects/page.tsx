"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { deleteProject } from "@/features/projects/projectSlice";
import { Search, Plus, Trash2, Edit } from "lucide-react";
import ProjectModal from "@/components/ProjectModal";

export default function ProjectsPage() {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.items);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);

  // Search and Filter Logic
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "All" || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (id: string) => {
    setEditingProject(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-textMain">
          Projects
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex justify-center items-center space-x-2 bg-cyan-600 dark:bg-primary text-white dark:text-background px-4 py-2.5 sm:py-2 rounded-lg font-medium hover:bg-cyan-700 dark:hover:bg-primary-dark transition-colors shadow-sm dark:shadow-neon shrink-0"
        >
          <Plus className="w-5 h-5 sm:w-4 sm:h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-3 sm:gap-4 bg-white dark:bg-surface p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-borderDark">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-textMuted" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 sm:py-2 bg-gray-50 dark:bg-background border border-gray-200 dark:border-borderDark rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-primary dark:text-textMain"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full md:w-48 px-4 py-2.5 sm:py-2 bg-gray-50 dark:bg-background border border-gray-200 dark:border-borderDark rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-primary dark:text-textMain"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4 sm:gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-surface p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-borderDark flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-start mb-4 gap-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-textMain leading-tight break-words">
                  {project.name}
                </h3>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border shrink-0
                  ${
                    project.status === "Active"
                      ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
                      : project.status === "Completed"
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                        : "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-500 dark:text-textMuted">
                <p>
                  Revenue:{" "}
                  <span className="font-medium text-gray-900 dark:text-textMain">
                    ${project.revenue.toLocaleString()}
                  </span>
                </p>
                <p>Date: {project.date}</p>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 flex justify-end space-x-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEdit(project.id)}
                className="p-2 bg-gray-50 sm:bg-transparent dark:bg-borderDark/30 sm:dark:bg-transparent rounded-lg sm:rounded-none text-gray-600 sm:text-gray-400 hover:text-cyan-500 dark:text-textMuted dark:hover:text-primary transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => dispatch(deleteProject(project.id))}
                className="p-2 bg-gray-50 sm:bg-transparent dark:bg-borderDark/30 sm:dark:bg-transparent rounded-lg sm:rounded-none text-gray-600 sm:text-gray-400 hover:text-red-500 dark:text-textMuted dark:hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          projectId={editingProject}
        />
      )}
    </div>
  );
}

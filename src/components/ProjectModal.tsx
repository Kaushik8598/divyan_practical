"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  addProject,
  updateProject,
  Project,
} from "@/features/projects/projectSlice";
import { X } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string | null;
}

export default function ProjectModal({
  isOpen,
  onClose,
  projectId,
}: ProjectModalProps) {
  const dispatch = useDispatch();
  const existingProject = useSelector((state: RootState) =>
    state.projects.items.find((p) => p.id === projectId),
  );

  const [formData, setFormData] = useState<Omit<Project, "id">>({
    name: "",
    status: "Active",
    revenue: 0,
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (existingProject) {
      setFormData({
        name: existingProject.name,
        status: existingProject.status,
        revenue: existingProject.revenue,
        date: existingProject.date,
      });
    }
  }, [existingProject]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (projectId) {
      dispatch(updateProject({ id: projectId, ...formData }));
    } else {
      dispatch(addProject({ id: Date.now().toString(), ...formData }));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-surface w-full max-w-md rounded-2xl border border-gray-200 dark:border-borderDark shadow-xl dark:shadow-neon overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-borderDark">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-textMain">
            {projectId ? "Edit Project" : "Create New Project"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-400 hover:text-gray-600 dark:hover:text-textMain transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-textMuted mb-1">
              Project Name
            </label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-50 dark:bg-background border border-gray-200 dark:border-borderDark rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-primary dark:text-textMain"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-textMuted mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as Project["status"],
                })
              }
              aria-label="Status"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-background border border-gray-200 dark:border-borderDark rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-primary dark:text-textMain"
            >
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-textMuted mb-1">
              Revenue ($)
            </label>
            <input
              required
              type="number"
              min="0"
              value={formData.revenue}
              onChange={(e) =>
                setFormData({ ...formData, revenue: Number(e.target.value) })
              }
              className="w-full px-4 py-2 bg-gray-50 dark:bg-background border border-gray-200 dark:border-borderDark rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-primary dark:text-textMain"
            />
          </div>

          <div className="pt-4 flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              aria-label="Cancel"
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-borderDark text-gray-700 dark:text-textMain rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              aria-label={projectId ? "Save Changes" : "Create Project"}
              className="flex-1 px-4 py-2 bg-cyan-600 dark:bg-primary text-white dark:text-background rounded-lg font-medium hover:bg-cyan-700 dark:hover:bg-primary-dark transition-colors dark:shadow-neon"
            >
              {projectId ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

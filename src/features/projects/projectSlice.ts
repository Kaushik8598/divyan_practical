import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storage } from "@/utils/storage";
import { STORAGE_KEYS } from "@/utils/constants";

export interface Project {
  id: string;
  name: string;
  status: "Active" | "Completed" | "On Hold";
  revenue: number;
  date: string;
}

interface ProjectState {
  items: Project[];
}

// Initial mock data to populate the dashboard if storage is empty
const defaultProjects: Project[] = [
  {
    id: "1",
    name: "Neural Net Optimization",
    status: "Active",
    revenue: 12500,
    date: "2026-06-10",
  },
  {
    id: "2",
    name: "Predictive Modeling API",
    status: "Completed",
    revenue: 8400,
    date: "2026-05-22",
  },
  {
    id: "3",
    name: "Vision AI Integration",
    status: "Active",
    revenue: 24000,
    date: "2026-06-15",
  },
];

const getInitialState = (): ProjectState => {
  const storedProjects = storage.get<Project[]>(STORAGE_KEYS.PROJECTS);
  return { items: storedProjects || defaultProjects };
};

const projectSlice = createSlice({
  name: "projects",
  initialState: getInitialState(),
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.items.push(action.payload);
      storage.set(STORAGE_KEYS.PROJECTS, state.items);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        storage.set(STORAGE_KEYS.PROJECTS, state.items);
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
      storage.set(STORAGE_KEYS.PROJECTS, state.items);
    },
  },
});

export const { addProject, updateProject, deleteProject } =
  projectSlice.actions;
export default projectSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { storage } from "@/utils/storage";
import { STORAGE_KEYS } from "@/utils/constants";

interface UIState {
  theme: "light" | "dark";
  sidebarOpen: boolean;
}

const getInitialState = (): UIState => {
  const savedTheme = storage.get<"light" | "dark">(STORAGE_KEYS.THEME);
  return {
    theme: savedTheme || "dark",
    sidebarOpen: true,
  };
};

const uiSlice = createSlice({
  name: "ui",
  initialState: getInitialState(),
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      storage.set(STORAGE_KEYS.THEME, state.theme);
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { toggleTheme, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;

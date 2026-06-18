import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ThemeWrapper from "@/components/ThemeWrapper";
import uiReducer from "@/features/ui/uiSlice";

// Helper to create a mock store
const createMockStore = (preloadedState: any) => {
  return configureStore({
    reducer: { ui: uiReducer },
    preloadedState,
  });
};

describe("ThemeWrapper Component", () => {
  beforeEach(() => {
    // Clear class list before each test
    document.documentElement.className = "";
  });

  it("adds the dark class to html when theme is dark", () => {
    const store = createMockStore({ ui: { theme: "dark", sidebarOpen: true } });

    render(
      <Provider store={store}>
        <ThemeWrapper>
          <div>Content</div>
        </ThemeWrapper>
      </Provider>,
    );

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("removes the dark class from html when theme is light", () => {
    // Start with dark class applied
    document.documentElement.classList.add("dark");

    const store = createMockStore({
      ui: { theme: "light", sidebarOpen: true },
    });

    render(
      <Provider store={store}>
        <ThemeWrapper>
          <div>Content</div>
        </ThemeWrapper>
      </Provider>,
    );

    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});

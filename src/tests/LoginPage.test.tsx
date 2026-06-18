import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import LoginPage from "@/app/login/page";
import authReducer from "@/features/auth/authSlice";

// Mock the Next.js router
jest.mock("next/navigation", () => ({
  useRouter() {
    return { push: jest.fn() };
  },
}));

describe("Login Page Form Validation", () => {
  it("shows an error if email is invalid", async () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const form = emailInput.closest("form")!; // Grab the form directly

    fireEvent.change(emailInput, { target: { value: "invalidemail.com" } });
    fireEvent.submit(form); // Force submit

    expect(
      await screen.findByText(/Please enter a valid email address/i),
    ).toBeInTheDocument();
  });

  it("shows an error if password is too short", async () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const form = emailInput.closest("form")!;

    fireEvent.change(emailInput, { target: { value: "test@divyan.ai" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.submit(form);

    expect(
      await screen.findByText(/Password must be at least 6 characters/i),
    ).toBeInTheDocument();
  });

  it("dispatches login and redirects on successful validation", () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const form = emailInput.closest("form")!;

    fireEvent.change(emailInput, { target: { value: "admin@divyan.ai" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.submit(form);

    expect(store.getState().auth.isAuthenticated).toBe(true);
  });
});

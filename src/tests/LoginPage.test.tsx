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

const renderWithRedux = (component: React.ReactElement) => {
  const store = configureStore({ reducer: { auth: authReducer } });
  return render(<Provider store={store}>{component}</Provider>);
};

describe("Login Page Form Validation", () => {
  it("shows an error if email is invalid", () => {
    renderWithRedux(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("admin@divyan.ai");
    const submitButton = screen.getByText("Authenticate Session");

    // Type an invalid email (no @ symbol)
    fireEvent.change(emailInput, { target: { value: "invalidemail.com" } });
    fireEvent.click(submitButton);

    // Assert the validation error appears
    expect(
      screen.getByText("Please enter a valid email address."),
    ).toBeInTheDocument();
  });

  it("shows an error if password is too short", () => {
    renderWithRedux(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("admin@divyan.ai");
    const passwordInput = screen.getByPlaceholderText("••••••••");
    const submitButton = screen.getByText("Authenticate Session");

    // Valid email, invalid password
    fireEvent.change(emailInput, { target: { value: "test@divyan.ai" } });
    fireEvent.change(passwordInput, { target: { value: "123" } }); // Less than 6 chars
    fireEvent.click(submitButton);

    // Assert the validation error appears
    expect(
      screen.getByText("Password must be at least 6 characters."),
    ).toBeInTheDocument();
  });
});

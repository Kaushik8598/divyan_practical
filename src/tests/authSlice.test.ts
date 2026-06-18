import authReducer, { login, logout } from "@/features/auth/authSlice";

describe("Auth Redux Slice", () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
  };

  it("should handle initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle login", () => {
    const actual = authReducer(
      initialState,
      login({ email: "test@divyan.ai", rememberMe: false }),
    );
    expect(actual.isAuthenticated).toEqual(true);
    expect(actual.user?.email).toEqual("test@divyan.ai");
  });

  it("should handle logout", () => {
    const loggedInState = {
      isAuthenticated: true,
      user: { email: "test@divyan.ai", name: "Admin User" },
    };
    const actual = authReducer(loggedInState, logout());
    expect(actual.isAuthenticated).toEqual(false);
    expect(actual.user).toBeNull();
  });
});

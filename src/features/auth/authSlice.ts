import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storage } from "@/utils/storage";
import { STORAGE_KEYS } from "@/utils/constants";

interface UserPayload {
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserPayload | null;
}

const getInitialState = (): AuthState => {
  const storedUser =
    storage.get<UserPayload>(STORAGE_KEYS.AUTH_USER) ||
    storage.sessionGet<UserPayload>(STORAGE_KEYS.AUTH_USER);

  if (storedUser) {
    return { isAuthenticated: true, user: storedUser };
  }
  return { isAuthenticated: false, user: null };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: string; rememberMe: boolean }>,
    ) => {
      const mockUser = { email: action.payload.email, name: "Admin User" };
      state.isAuthenticated = true;
      state.user = mockUser;

      // Use the utility to save data based on the 'Remember Me' preference
      if (action.payload.rememberMe) {
        storage.set(STORAGE_KEYS.AUTH_USER, mockUser);
      } else {
        storage.sessionSet(STORAGE_KEYS.AUTH_USER, mockUser);
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;

      // Use the utility to clear data
      storage.remove(STORAGE_KEYS.AUTH_USER);
      storage.sessionRemove(STORAGE_KEYS.AUTH_USER);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

type Credentials = {
  email: string;
  password: string;
};

type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: { message: string } | null;
};

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const loginUser = async ({ email, password }: Credentials): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "kwame.com" && password === "pass") {
        resolve({
          id: 1,
          name: "Kwame",
          email: "kwame.com",
          password: "pass",
        });
      } else {
        reject({ message: "Invalid email or password" });
      }
    }, 1000);
  });
};

export const loginAsync = createAsyncThunk<
  User,
  Credentials,
  { rejectValue: { message: string } }
>("auth/loginAsync", async (credentials, { rejectWithValue }) => {
  try {
    const user = await loginUser(credentials);
    return user;
  } catch (err) {
    // If `loginUser` function throws an error, it will be caught here
    // Assuming that `err` is an instance of `Error`
    if (err instanceof Error) {
      return rejectWithValue({ message: err.message });
    }
    // If it's not an `Error`, you might want to return a generic error message
    return rejectWithValue({ message: "Unknown error occurred" });
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload; // Set the user in the state
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ? action.payload : null;
    });
  },
});

export const { logout } = authSlice.actions;

export const selectUser = (state: RootState) => {
  const user = state.auth.user;

  return user && typeof user === "object"
    ? { email: user.email, password: user.password }
    : null;
};

export default authSlice.reducer;

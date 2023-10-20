import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState, ILogin, IRegister } from "./authInterface";
import {
  getLocalToken,
  getLocalUser,
  removeLocalToken,
  removeLocalUser,
} from "@/app/util/localstorage";
import { loginThunk, registerThunk } from "./authAction";
import { toast } from "react-toastify";

const initialAuthState: AuthState = {
  loading: false,
  error: "",
  data: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logOut: (state) => {
      state.data = {};
      removeLocalToken();
      removeLocalUser();
    },
    resetUser: (state) => {
      if (getLocalToken() && getLocalUser()) {
        const token = JSON.parse(getLocalToken() ?? "");
        const user = JSON.parse(getLocalUser() ?? "");
        state.data.token = token;
        state.data.user = user;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerThunk.pending, (state) => {
      state.loading = true;
      state.data = {};
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      console.log("user:", action.payload);
      state.loading = false;
      state.data.user = action.payload;
    });
    builder.addCase(
      registerThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        toast.error(action.payload);
      }
    );
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(
      loginThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        toast.error(action.payload);
      }
    );
  },
});

const { reducer: authReducer } = authSlice;

export const { logOut, resetUser } = authSlice.actions;
export { authReducer };

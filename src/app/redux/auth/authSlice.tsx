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
  dataAuth: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logOut: (state) => {
      state.dataAuth = {};
      removeLocalToken();
      removeLocalUser();
    },
    resetUser: (state) => {
      if (getLocalToken() && getLocalUser()) {
        const token = JSON.parse(getLocalToken() ?? "") 
        const user = JSON.parse( getLocalUser() ?? "");
        state.dataAuth.token = token;
        state.dataAuth.user = user;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerThunk.pending, (state) => {
      state.loading = true;
      state.dataAuth = {};
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.loading = false
      toast.success(action.payload)
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
      state.dataAuth = action.payload;
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

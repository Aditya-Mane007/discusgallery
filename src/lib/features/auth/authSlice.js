import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { decryptPayload, handleAPICall } from "@/lib/utils";

const initialState = {
  user: "",
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
  actionType: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    return await handleAPICall(formData, authService.login, thunkAPI);
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    return await handleAPICall(formData, authService.register, thunkAPI);
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  return await handleAPICall(_, authService.logout, thunkAPI);
});

export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  return await handleAPICall(_, authService.getUser, thunkAPI);
});

export const generateOTP = createAsyncThunk(
  "auth/generateOTP",
  async (_, thunkAPI) => {
    return await handleAPICall(_, authService.generateOTP, thunkAPI);
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (formData, thunkAPI) => {
    
    return await handleAPICall(formData, authService.verifyOTP, thunkAPI);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.actionType = "login";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.actionType = "login";
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.actionType = "register";
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.actionType = "register";
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.actionType = "logout";
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.actionType = "logout";
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.actionType = "getUser";
        state.user = action.payload.data;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.actionType = "getUser";
      })
      .addCase(generateOTP.pending, (state) => {
        state.isLoading = true;
        state.actionType = "generateOTP";
      })
      .addCase(generateOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.actionType = "generateOTP";
        state.user = action.payload.data;
      })
      .addCase(generateOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.actionType = "generateOTP";
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.actionType = "verifyOTP";
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.actionType = "verifyOTP";
        state.user = action.payload.data;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.actionType = "verifyOTP";
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

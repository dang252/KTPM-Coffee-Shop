import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  PendingAction,
  FulfilledAction,
  RejectedAction,
} from "../../types/reduxThunk.type";
import { UserAccount } from "../../types/user";

// Interface declair
interface UserState {
  currentId: string;
  id: number;
  username: string;
  fullname: string;
  email: string;
  phone: string;
  isLoading: boolean;
  isError: boolean;
}

// InitialState value
const initialState: UserState = {
  currentId: "",
  id: NaN,
  username: "",
  fullname: "",
  email: "",
  phone: "",
  isLoading: false,
  isError: false,
};

// createAsyncThunk middleware
export const registerAccount = createAsyncThunk(
  "user/register_account",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (account: UserAccount, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        {
          // signal: thunkAPI.signal,
          username: account.username,
          email: account.email,
          password: account.password,
          phone: account.phone,
          fullname: account.fullname,
        }
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginAccount = createAsyncThunk(
  "user/login_account",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (account: UserAccount, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        {
          username: account.username,
          password: account.password,
        }
      );
      return response.data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logoutAccount = createAsyncThunk(
  "user/logout_account",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async (id: number, thunkAPI) => {
    try {
      const accessToken = localStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/logout`,
        {
          userId: id
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        },
      );
      return response.data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const stopLoad = () => ({
  type: 'STOP_LOADING',
});


const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerAccount.pending, () => {

    })
    .addCase(registerAccount.fulfilled, (state, action) => {
      if (action.payload) {
        const accessToken: string = action.payload.accessToken;
        const refreshToken: string = action.payload.refreshToken;
        state.id = action.payload.sub;
        state.username = action.payload.username;
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
        localStorage.setItem("refreshToken", JSON.stringify(refreshToken));

      }
    })
    .addCase(registerAccount.rejected, (_) => {
    })
    .addCase(loginAccount.pending, (_) => {
    })
    .addCase(loginAccount.fulfilled, (state, action) => {
      if (action.payload) {
        const accessToken: string = action.payload.accessToken;
        const refreshToken: string = action.payload.refreshToken;
        state.id = action.payload.sub;
        state.username = action.payload.username;
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
        localStorage.setItem("refreshToken", JSON.stringify(refreshToken));

      }
    })
    .addCase(logoutAccount.fulfilled, () => {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      return initialState;
    })
    .addMatcher(
      (action): action is PendingAction => action.type.endsWith("/pending"),
      (state, action) => {
        state.currentId = action.meta.requestId;
        if (state.currentId === action.meta.requestId) {
          state.isLoading = true;
        }
      }
    )
    .addMatcher(
      (action): action is FulfilledAction => action.type.endsWith("/fulfilled"),
      (state, action) => {
        if (state.isLoading && state.currentId === action.meta.requestId) {
          state.isLoading = false;
          state.isError = false;
        }
      }
    )
    .addMatcher(
      (action): action is RejectedAction => action.type.endsWith("/rejected"),
      (state, action) => {
        if (state.isLoading && state.currentId === action.meta.requestId) {
          state.isLoading = false;
          state.isError = true;
        }
      }
    );
});

export default userReducer;

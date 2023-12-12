import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  PendingAction,
  FulfilledAction,
  RejectedAction,
} from "../../types/reduxThunk.type";

// Interface declair
interface UserState {
  currentId: string;
  id: string;
  username: string;
  name: string;
  email: string;
  isLoading: boolean;
  isError: boolean;
}

// InitialState value
const initialState: UserState = {
  currentId: "",
  id: "",
  username: "",
  name: "",
  email: "",
  isLoading: false,
  isError: false,
};

// createAsyncThunk middleware
export const loginAccount = createAsyncThunk(
  "users/loginAccount",

  async (account: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          signal: thunkAPI.signal,
          username: account.username,
          password: account.password,
        }
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name === "AxiosError") {
        return thunkAPI.rejectWithValue({ message: "Login account failed" });
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder
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

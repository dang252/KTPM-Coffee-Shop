import { createReducer } from "@reduxjs/toolkit";

// Interface declair
interface UserState {
  id: string;
  username: string;
  name: string;
  email: string;
}

// InitialState value
const initialState: UserState = {
  id: "",
  username: "",
  name: "",
  email: "",
};

// createAsyncThunk middleware

const userReducer = createReducer(initialState, (builder) => {
  builder;
});

export default userReducer;

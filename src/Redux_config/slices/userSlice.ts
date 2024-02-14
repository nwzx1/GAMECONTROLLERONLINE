import { createSlice, PayloadAction } from '@reduxjs/toolkit';
;

interface UserState {
  userId: string | null;
  userDetails: {} | null;
}


const initialState: UserState = {
  userId: null,
  userDetails: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<{ userId: string; userDetails: {} }>) => {
      state.userId = action.payload.userId;
      state.userDetails = action.payload.userDetails;
    },
  },
});

export const { registerUser } = userSlice.actions;
export default userSlice.reducer;
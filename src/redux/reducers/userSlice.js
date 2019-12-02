import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  login: null,
  user: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    updateUsers: (state, { payload: { login, user } }) => ({ ...state, login, user }),
  },
});

export const USER_SLICE_NAME = userSlice.name;
export const { updateUsers } = userSlice.actions;
export default userSlice.reducer;

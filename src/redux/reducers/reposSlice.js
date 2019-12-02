import { createSlice } from '@reduxjs/toolkit';

const reposSlice = createSlice({
  name: 'repos',
  initialState: {
    repos: [],
    repo: {},
  },
  reducers: {
    updateRepos: (state, { payload: { repos } }) => ({ ...state, repos }),
    updateRepo: (state, { payload: { repo } }) => ({ ...state, repo }),
  },
});

export const REPOS_SLICE_NAME = reposSlice.name;
export const { updateRepos, updateRepo } = reposSlice.actions;

export default reposSlice.reducer;

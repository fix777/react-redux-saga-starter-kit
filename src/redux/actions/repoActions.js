import { createAction } from '@reduxjs/toolkit';

import { updateRepos, updateRepo } from './../reducers/reposSlice';

const REQUEST = 'REQUEST';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  return [REQUEST, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export const REPOS = createRequestTypes('REPOS');
export const REPO = createRequestTypes('REPO');

export const loadRepoInfo = createAction('LOAD_REPO');

export const repos = {
  request: url => createAction(REPOS[REQUEST])({ url }),
  success: (url, { entities: { repos }, result }) => {
    const _repos = result.map(fullName => repos[fullName]);
    return createAction(updateRepos.type)({ url, repos: _repos });
  },
  failure: (url, error) => createAction(REPOS[FAILURE])({ url, error }),
};

export const repo = {
  request: url => createAction(REPO[REQUEST])({ url }),
  success: (url, { entities: { repos }, result }) => {
    return createAction(updateRepo.type)({ url, repo: repos[result] });
  },
  failure: (url, error) => createAction(REPO[FAILURE])({ url, error }),
};

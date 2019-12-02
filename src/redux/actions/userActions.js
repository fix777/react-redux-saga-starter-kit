import { createAction } from '@reduxjs/toolkit';

import { updateUsers } from './../reducers/userSlice';

const REQUEST = 'REQUEST';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  return [REQUEST, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export const USER = createRequestTypes('USER');

export const loadUserInfo = createAction('LOAD_USER');

export const user = {
  request: login => createAction(USER[REQUEST])({ login }),
  success: (login, { entities: { users }, result }) => {
    return createAction(updateUsers.type)({ login, user: users[result] });
  },
  failure: (login, error) => createAction(USER[FAILURE])({ login, error }),
};

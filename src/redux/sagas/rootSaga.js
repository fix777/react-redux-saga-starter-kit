import { all, fork } from 'redux-saga/effects';

import { watchLoadUserPage } from './userSagas';
import { watchLoadRepo } from './reposSaga';

export default function* root() {
  yield all([fork(watchLoadUserPage), fork(watchLoadRepo)]);
}

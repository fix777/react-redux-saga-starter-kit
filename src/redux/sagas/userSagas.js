import { fork, take, call, put } from 'redux-saga/effects';

import { userService, repoService } from '@/services';
import { loadUserInfo, user } from './../actions/userActions';
import { repos } from './../actions/repoActions';
import { loadRepos } from './reposSaga';

/***************************** Subroutines ************************************/

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass id to apiFn
function* fetchEntity(entity, apiFn, id, url) {
  yield put(entity.request(id));
  const { response, error } = yield call(apiFn, url || id);
  if (response) {
    yield put(entity.success(id, response));
  } else {
    yield put(entity.failure(id, error));
  }
}

// yeah! we can also bind Generators
export const fetchUser = fetchEntity.bind(null, user, userService.fetchUser);
export const fetchRepos = fetchEntity.bind(null, repos, repoService.fetchRepos);

// load user unless it is cached
function* loadUser(login) {
  // const user = yield select(getUser, login);
  // if (!user || requiredFields.some(key => !user.hasOwnProperty(key))) {
  yield call(fetchUser, login);
  // }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

// Fetches data for a User : user data + starred repos
export function* watchLoadUserPage() {
  while (true) {
    const { payload } = yield take(loadUserInfo.type);
    const { login } = payload;

    yield fork(loadUser, login);
    yield fork(loadRepos, login);
  }
}

import { fork, take, call, put } from 'redux-saga/effects';

import { repoService } from '@/services';
import { loadRepoInfo, repos, repo } from './../actions/repoActions';

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
export const fetchRepos = fetchEntity.bind(null, repos, repoService.fetchRepos);
export const fetchRepo = fetchEntity.bind(null, repo, repoService.fetchRepo);

export function* loadRepos(login) {
  // const url = yield select(state => state.entities.users[login].repoUrl);
  yield call(fetchRepos, `users/${login}/repos`);
}

function* loadRepo(name, repoName) {
  yield call(fetchRepo, `repos/${name}/${repoName}`);
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

// Fetches data for a User : user data + starred repos
export function* watchLoadRepo() {
  while (true) {
    const { payload } = yield take(loadRepoInfo.type);
    const { name, repoName } = payload;

    yield fork(loadRepo, name, repoName);
  }
}

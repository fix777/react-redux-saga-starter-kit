import { schema } from 'normalizr';

import { APP_NAME_MAP, callApi } from './api';

export const userSchema = new schema.Entity('users', {}, { idAttribute: 'login' });

export const fetchUser = login =>
  callApi({ appName: APP_NAME_MAP.GITHUB, endpoint: `users/${login}` }, userSchema);

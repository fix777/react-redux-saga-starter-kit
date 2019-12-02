import { schema } from 'normalizr';

import { userSchema } from './userService';
import { APP_NAME_MAP, callApi } from './api';

const repoSchema = new schema.Entity('repos', {}, { idAttribute: 'fullName' });

repoSchema.define({
  owner: userSchema,
});

const repoSchemaArray = new schema.Array(repoSchema);

export const fetchRepos = url =>
  callApi({ appName: APP_NAME_MAP.GITHUB, endpoint: url }, repoSchemaArray);
export const fetchRepo = url =>
  callApi({ appName: APP_NAME_MAP.GITHUB, endpoint: url }, repoSchema);

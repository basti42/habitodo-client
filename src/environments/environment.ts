// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const host = "localhost";
const port = "5000";

export const environment = {
  production: false,
  user_registration: `http://${host}:${port}/api/v1/users/`,
  user_login: `http://${host}:${port}/api/v1/users/`,
  user_logout: `http://${host}:${port}/api/v1/users/logout`,
  user_information: `http://${host}:${port}/api/v1/users/me`,
  user_profile_update: `http://${host}:${port}/api/v1/users/me`,

  user_avatar_upload: `http://${host}:${port}/api/v1/files/upload/useravatar`,
  // user_profile: `http://${host}:${port}/api/v1/user/profile`,
  team_get: `http://${host}:${port}/api/v1/teams/`,
  team_add: `http://${host}:${port}/api/v1/teams/`,
  team_delete: `http://${host}:${port}/api/v1/team/delete`,
  user_metrics: `http://${host}:${port}/api/v1/metrics/users/`,
  team_metrics: `http://${host}:${port}/api/v1/metrics/teams/`,
  templates: `http://${host}:${port}/api/v1/metrics/templates/`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

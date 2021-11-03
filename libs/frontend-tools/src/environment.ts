const apiPath = '/api';

export const environment = {
  production: (window as any).__env?.production || false,
  bob: (window as any).__env?.bob || 'undefined',
  // hmr: true,
  // envName: 'local',
  // appVersion,
  // buildVersion: 'dev local',
  // docApiUrl : '/swagger-ui.html',
  // logsApiUrl: '/api/logs',
  // enabledCache: false, // enable cache management (application + localStorage)
  serviceWorkerScript: (window as any).__env?.serviceWorkerScript || 'undefined',

  wsEndpoint: (window as any).__env?.wsEndpoint || 'undefined',
  backendApi: {
    baseUrlAuth:          (window as any).__env?.backendApi?.baseUrlAuth || 'undefined',
    baseUrlUser:          (window as any).__env?.backendApi?.baseUrlUser || 'undefined',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// Environment variables loaded at runtime (no need to rebuild the app)
// Useful to deploy our Angular application in different environments (staging, production, etc.) with different configurations
// without changing the the application code and without even rebuilding the application
(function(window) {
  window.__env = window.__env || {};

  const backendHostname = 'localhost:3333';
  // const backendHostname = 'dev.family-calendar.nicolasmura.com';
  const secure   = false;
  const protocol = secure ? 'https' : 'http';
  const ws       = secure ? 'wss' : 'ws';
  const apiPath  = '/api';

  // Environment variables
  window.__env.production = false;
  window.__env.hmr = true;
  window.__env.bob = 'bobby';
  // window.__env.serviceWorkerScript = window.__env.production ? 'sw-master.js' : 'sw-sync.js';
  window.__env.staticAssets = protocol + '://' + backendHostname + '/medias';
  window.__env.wsEndpoint = ws + '://' + backendHostname;
  window.__env.backendApi = {};
  window.__env.backendApi.baseUrl              = protocol + '://' + backendHostname + apiPath;
  window.__env.backendApi.baseUrlAuth          = protocol + '://' + backendHostname + apiPath + '/auth';
  window.__env.backendApi.baseUrlUser          = protocol + '://' + backendHostname + apiPath + '/users';
  window.__env.backendApi.baseUrlMedia         = protocol + '://' + backendHostname + apiPath + '/medias';
})(this);

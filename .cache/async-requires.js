// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-pages-app-js": () => import("./../src/pages/app.js" /* webpackChunkName: "component---src-pages-app-js" */),
  "component---src-pages-create-account-js": () => import("./../src/pages/create-account.js" /* webpackChunkName: "component---src-pages-create-account-js" */),
  "component---src-pages-d-js": () => import("./../src/pages/d.js" /* webpackChunkName: "component---src-pages-d-js" */),
  "component---src-pages-index-js": () => import("./../src/pages/index.js" /* webpackChunkName: "component---src-pages-index-js" */),
  "component---src-pages-sign-in-js": () => import("./../src/pages/sign-in.js" /* webpackChunkName: "component---src-pages-sign-in-js" */)
}


/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import Router from 'vue-router';
import Meta from 'vue-meta';
import firebase from 'firebase';

// Routes
import paths from './paths';

Vue.use(Router);

function route(path, view, name, children) {
  let childRoutes;
  if (children) {
    childRoutes = children.map(
      child => route(child.path,
        child.view,
        child.name,
        child.children),
    );
  }

  return {
    name: name || view,
    path,
    component: resolve => import(`@/views/${view}.vue`).then(resolve),
    children: childRoutes,
  };
}

// Create a new router
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: paths.map(path => route(path.path, path.view, path.name, path.children)).concat([
    { path: '*', redirect: '/login' },
  ]),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const { currentUser } = firebase.auth();
  if (to.path === '/login') {
    firebase.auth().signOut();
    next();
  } else if (to.path !== '/login' && to.path !== '/cadastro' && !currentUser) {
    next('login');
  } else next();
});

Vue.use(Meta);

// Bootstrap Analytics
// Set in .env
// https://github.com/MatteoGabriele/vue-analytics
if (process.env.GOOGLE_ANALYTICS) {
  Vue.use(VueAnalytics, {
    id: process.env.GOOGLE_ANALYTICS,
    router,
    autoTracking: {
      page: process.env.NODE_ENV !== 'development',
    },
  });
}

export default router;

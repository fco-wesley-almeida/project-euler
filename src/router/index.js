import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import firebase from 'firebase';
import store from '@/store';
// File mapping route names to files
import paths from './paths';

Vue.use(Router);

// Create routes and their child routes accourding to paths
function route(path, view, name, meta, children) {
  let childRoutes;
  if (children) {
    childRoutes = children.map(
      child => route(child.path,
        child.view,
        child.name,
        child.meta,
        child.children),
    );
  }
  const r = {
    name: name || view,
    path,
    meta,
    component: resolve => import(`@/views/${view}.vue`).then(resolve),
    children: childRoutes,
  };
  return r;
}

// Create a new router
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: paths.map(path => route(path.path,
    path.view,
    path.name,
    path.meta,
    path.children)).concat([
      { path: '*', redirect: '/tutorias' },
    ]),
  // Resets scroll if it is a new route
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

// Login check
router.beforeEach((to, from, next) => {
  const { currentUser } = firebase.auth();
  // Logs out if path is login
  if (to.path === '/login') {
    firebase.auth().signOut();
    next();
    // Check if user is logged in whenever they navigate
  } else if (to.path !== '/login' && to.path !== '/cadastro' && !currentUser) {
    next('login');
  } else if (to.params["tutorialID"]) {
    let user = store.state.app.user || {};
    if (user.ownedTutorials) {
      console.log("user.ownedTutorials")
      if (user.ownedTutorials.includes(to.params["tutorialID"])) {
        next();
      } else {
        next({
          name: 'Tutorias'
        });
      }
    } else {
      console.log(user);
      next({
        name: 'Tutorias'
      });
    }
  } else next();
});

Vue.use(Meta);

export default router;

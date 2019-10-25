import Vue from 'vue';
import { firestorePlugin } from 'vuefire';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';

import { auth, db } from '@/firebase/db';

let app;

Vue.config.productionTip = false;
Vue.use(firestorePlugin);

//Initialize app after checking if user has logged in
auth.onAuthStateChanged((user) => {
  if (user) {
    store.state.app.userID = user.uid;
    db.collection('teachers').doc(user.uid).get().then((doc) => {
      if (doc.exists) {
        store.state.app.user = doc.data();
      } else {
        // doc.data() will be undefined in this case
        // TODO: Create teacher
      }
    });
  } else {
    store.state.app.userID = null;
  }

  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
    }).$mount('#app');
  }
});

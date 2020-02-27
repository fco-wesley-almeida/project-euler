import Vue from 'vue';
import { firestorePlugin } from 'vuefire';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';

import { auth, db } from '@/firebase/db';

// @ts-ignore
import VueChatScroll from 'vue-chat-scroll';

let app : Vue;
Vue.use(VueChatScroll);

Vue.config.productionTip = false;
Vue.use(firestorePlugin);

// Initialize app after checking if user has logged in
auth.onAuthStateChanged((user) => {
  if (user) {
    store.state.app.userID = user.uid;
    db.collection('teachers').doc(user.uid).get().then((doc) => {
      if (doc.exists) {
        const userData = {
          name: user.displayName,
          email: user.email,
          imageURL: user.photoURL,
          uid: user.uid,
        };
        store.state.app.user = userData;
      } else {
        const userData = {
          name: user.displayName,
          email: user.email,
          imageURL: user.photoURL,
          uid: user.uid,
        };

        db.collection('teachers').doc(user.uid).set(userData);
        store.state.app.user = userData;
      }
    });
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

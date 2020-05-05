import Vue from 'vue';
import { firestorePlugin } from 'vuefire';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';

import { auth, db } from '@/firebase/config';

// @ts-ignore
import VueChatScroll from 'vue-chat-scroll';
import { checkUserData, userCanLogin } from "@/firebase/api/auth";

let app : Vue;
Vue.use(VueChatScroll);

Vue.config.productionTip = false;
Vue.use(firestorePlugin);

// Initialize app after checking if user has logged in
auth.onAuthStateChanged((user) => {
  if (user && userCanLogin(user)) {
    db.collection('users').doc(user.uid).get().then( (snapshot) => {
      let data = snapshot.data() || {};
      store.state.app.user.ownedTutorials = data['ownedTutorials'];
    });
    checkUserData(user);
    store.state.app.userID = user.uid;

    const userData = {
      name: user.displayName,
      email: user.email,
      imageURL: user.photoURL,
      uid: user.uid,
    };
    store.state.app.user = userData;
  } else {
    auth.signOut();
    store.state.app.userID = null;
    store.state.app.user = null;
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
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAK3PwFsD01mrtqVH-2AsdQJ1aosGBpmLs',
  authDomain: 'radiography-atlas.firebaseapp.com',
  databaseURL: 'https://radiography-atlas.firebaseio.com',
  projectId: 'radiography-atlas',
  storageBucket: 'gs://radiography-atlas.appspot.com',
  messagingSenderId: '637504173632',
  appId: '1:637504173632:web:10bbc10ab1736f55',
};
// Get a Firestore instance
const app = firebase
  .initializeApp(firebaseConfig);

const firestore = app.firestore();

firestore.enablePersistence();

export const db = firestore;

export const storage = firebase.storage(app);

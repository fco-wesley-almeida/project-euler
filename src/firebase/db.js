import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDOCGhxdSQ7mBt_3SjBXcgUPcif3ap2pcE',
  authDomain: 'pbl-system.firebaseapp.com',
  databaseURL: 'https://pbl-system.firebaseio.com',
  projectId: 'pbl-system',
  storageBucket: 'pbl-system.appspot.com',
  messagingSenderId: '1057791451895',
  appId: '1:1057791451895:web:60114936090fdf9d5fa9f2',
  measurementId: 'G-4EDGMCY6JK',
};

const app = firebase
  .initializeApp(firebaseConfig);

firebase.analytics();

const firestore = app.firestore();
firestore.enablePersistence();
export const db = firestore;

export const auth = firebase.auth();

export const storage = firebase.storage(app);

export const { Timestamp, FieldValue } = firebase.firestore;

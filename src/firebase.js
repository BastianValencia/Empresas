import { firebase } from '@firebase/app';

require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");
  // Your web app's Firebase configuration

  var firebaseConfig = {
    apiKey: "AIzaSyD_OL8wLB4bYY2u3QTR5UbCOksJXxGhF4I",
    authDomain: "proyectsms.firebaseapp.com",
    projectId: "proyectsms",
    storageBucket: "proyectsms.appspot.com",
    messagingSenderId: "239366814387",
    appId: "1:239366814387:web:1cac2609f55f479edacec6",
    measurementId: "G-KT6GPBKMH3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {firebase, db, auth, storage}
// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
    apiKey: "AIzaSyAWDYFzzgcqmCaaYT4zUJ4M9y8dUdX4Px4",
    authDomain: "nestedboxes-99ea8.firebaseapp.com",
    databaseURL: "https://nestedboxes-99ea8-default-rtdb.firebaseio.com",
    projectId: "nestedboxes-99ea8",
    storageBucket: "nestedboxes-99ea8.appspot.com",
    messagingSenderId: "349160980335",
    appId: "1:349160980335:web:91a0d412518f79bb8bf29a",
    measurementId: "G-9CWCCLB9ZG"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var db = firebase.firestore();
  var ui = new firebaseui.auth.AuthUI(firebase.auth());



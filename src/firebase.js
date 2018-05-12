import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBRz9nNMbRoEHpkIwwsmVAxc3AfLRBTQhI",
    authDomain: "lys-project-481d2.firebaseapp.com",
    databaseURL: "https://lys-project-481d2.firebaseio.com",
    projectId: "lys-project-481d2",
    storageBucket: "lys-project-481d2.appspot.com",
    messagingSenderId: "182830776686"
  };
firebase.initializeApp(config);

const databaseRef = firebase.database().ref();
export const articlesRef = databaseRef.child("articles");
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

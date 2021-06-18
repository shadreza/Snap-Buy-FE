import firebase from "firebase";

// var firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MASSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_API_ID,
// };

var firebaseConfig = {
  apiKey: "AIzaSyDhDxEpJ9-5yn7-5bVM9-8LLqHFKeaGwkM",
  authDomain: "db-project-acbcf.firebaseapp.com",
  projectId: "db-project-acbcf",
  storageBucket: "db-project-acbcf.appspot.com",
  messagingSenderId: "141565621057",
  appId: "1:141565621057:web:ea419c6b37a6dadb5567c0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

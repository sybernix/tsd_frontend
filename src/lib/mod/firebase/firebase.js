import firebase from "firebase/app";
import "@firebase/messaging";
import { Config } from "../../global/Config";

const initializedFirebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCOVQG62knXJnLd0jAkFoV3W-JtwuIFi2w",
  authDomain: "msc-tsd.firebaseapp.com",
  databaseURL: "https://msc-tsd.firebaseio.com",
  projectId: "msc-tsd",
  storageBucket: "msc-tsd.appspot.com",
  messagingSenderId: "383578177905",
  appId: "1:383578177905:web:e7e4b7084e2f5e08cbb6d0",
  measurementId: "G-0WEKLMM00F",
});
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(
  // Project Settings => Cloud Messaging => Web Push certificates
  "BB8ZiIz2g3B2jaRdjhrjxcv5E6P51d-6jUUFjuDYIDEZzQiNbMFBcTgXsvpCrAHIoG52lkaDiL7KzrN4QMZRNmg"
);
export { messaging };

//import { Config } from "../src/lib/global/Config";
// import firebase scripts inside service worker js script
importScripts("https://www.gstatic.com/firebasejs/5.7.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.7.2/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyCOVQG62knXJnLd0jAkFoV3W-JtwuIFi2w",
  authDomain: "msc-tsd.firebaseapp.com",
  databaseURL: "https://msc-tsd.firebaseio.com",
  projectId: "msc-tsd",
  storageBucket: "msc-tsd.appspot.com",
  messagingSenderId: "383578177905",
  appId: "1:383578177905:web:e7e4b7084e2f5e08cbb6d0",
  measurementId: "G-0WEKLMM00F",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener("notificationclick", function (event) {
  alert("Notification added");
});

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMi5JbH_7L0NRU8l7UbtD184FcIxxFtVY",
  authDomain: "posts-app-621e6.firebaseapp.com",
  projectId: "posts-app-621e6",
  storageBucket: "posts-app-621e6.appspot.com",
  messagingSenderId: "781627106732",
  appId: "1:781627106732:web:20ab34983748bd6ee38609",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

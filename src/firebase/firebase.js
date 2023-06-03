import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Configure Firebase.
const configFireBase = {
  apiKey: "AIzaSyDsQWxe_rbfrawVf_zDiXeQ30Xl6oHEmlI",
  authDomain: "vebotv-c6f41.firebaseapp.com",
  projectId: "vebotv-c6f41",
};
const app = firebase.initializeApp(configFireBase);

export const auth = getAuth(app);

export default app;

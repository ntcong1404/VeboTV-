import axios from "axios";
import firebase from "firebase/compat/app";

// handle token headers request
const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "content-type": "application/json",
  },
});

const getFireBaseToken = async () => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) return currentUser.getIdToken();

  // not logged in
  const hasRememberAccount = localStorage.getItem(
    "firebase:authUser:AIzaSyDsQWxe_rbfrawVf_zDiXeQ30Xl6oHEmlI:[DEFAULT]"
  );
  if (!hasRememberAccount) return null;

  // logged in but current user is notfetched => wait 10s
  return new Promise((resolve, reject) => {
    const waitTimer = setTimeout(() => {
      reject(null);
    }, 10000);
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          reject(null);
        }
        const token = await user.getIdToken();
        resolve(token);
        unregisterAuthObserver();
        clearTimeout(waitTimer);
      });
  });
};

// Interceptors
request.interceptors.request.use(async (config) => {
  const token = await getFireBaseToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// method
export const get = async (path, option = {}) => {
  const response = await request.get(path, option);
  return response.data;
};

export default request;

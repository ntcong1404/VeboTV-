import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase/firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  const logOut = () => {
    return signOut(auth)
      .then(() => {
        setCurrentUser(null);
      })
      .catch((error) => console.log(error));
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   useEffect(() => {
  //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //       setUser(currentUser);
  //     });
  //     return () => {
  //       unsubscribe();
  //     };
  //   }, []);

  // handle firebase auth change
  useEffect(() => {
    const unRegisterAuthObserver = auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (!user) {
        console.log("user is not registered");
        return;
      }

      const token = await user.getIdToken();
      console.log(token);
      setUser(user);
      setCurrentUser(!!user);
    });
    return () => unRegisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        currentUser,
        updateUserProfile,
        logOut,
        signIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};

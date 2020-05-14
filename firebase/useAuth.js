import React, { useState, useEffect, useContext, createContext } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.firebaseApiKey,
    authDomain: process.env.firebaseAuthDomain,
    databaseURL: process.env.firebaseDatabaseUrl,
    projectId: process.env.firebaseProjectId,
    storageBucket: process.env.firebaseStorageBucketUrl,
    messagingSenderId: process.env.firebaseMessagingSenderId,
    appId: process.env.firebaseAppId,
  });
}

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const provider = new firebase.auth.TwitterAuthProvider();

  const signin = () =>
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(response => {
        setUser(response.user);
        return response.user;
      });

  const signout = () =>
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    userId: user && user.uid,
    signin,
    signout,
  };
}

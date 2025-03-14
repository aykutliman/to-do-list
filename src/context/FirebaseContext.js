import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";
import { FIREBASE_API } from "../config";

const firebaseApp = initializeApp(FIREBASE_API);

const AUTH = getAuth(firebaseApp);

const DB = getFirestore(firebaseApp);

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === "INITIALISE") {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

const FirebaseContext = createContext({
  ...initialState,
  method: "firebase",
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

FirebaseProvider.propTypes = {
  children: PropTypes.node,
};

function FirebaseProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () =>
      onAuthStateChanged(AUTH, async (user) => {
        if (user) {
          dispatch({
            type: "INITIALISE",
            payload: { isAuthenticated: true, user },
          });
        } else {
          dispatch({
            type: "INITIALISE",
            payload: { isAuthenticated: false, user: null },
          });
        }
      }),
    []
  );

  const login = (email, password) =>
    signInWithEmailAndPassword(AUTH, email, password);

  const register = (email, password) =>
    createUserWithEmailAndPassword(AUTH, email, password).then(async (res) => {
      const userRef = doc(collection(DB, "users"), res.user?.uid);

      await setDoc(userRef, {
        uid: res.user?.uid,
        email,
      });
    });

  const logout = () => signOut(AUTH);

  const getAll = async (collectionName) => {
    const docRef = collection(DB, collectionName);

    const docSnap = await getDocs(docRef);

    return docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  const add = async (collectionName, data) => {
    const docRef = doc(collection(DB, collectionName));

    await setDoc(docRef, data);
  };

  const update = async (collectionName, id, data) => {
    const docRef = doc(collection(DB, collectionName), id);

    await updateDoc(docRef, data);
  };

  const remove = async (collectionName, id) => {
    const docRef = doc(collection(DB, collectionName), id);

    await deleteDoc(docRef);
  };

  return (
    <FirebaseContext.Provider
      value={{
        ...state,
        method: "firebase",
        user: state.user,
        login,
        register,
        logout,
        getAll,
        add,
        update,
        remove,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export { FirebaseContext, FirebaseProvider };

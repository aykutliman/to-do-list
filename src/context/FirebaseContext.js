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
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import PropTypes from "prop-types";
import { createContext, useEffect, useReducer, useState } from "react";
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
  tasks: [],
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  add: () => Promise.resolve(),
  update: () => Promise.resolve(),
  remove: () => Promise.resolve(),
});

FirebaseProvider.propTypes = {
  children: PropTypes.node,
};

function FirebaseProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [tasks, setTasks] = useState([]);
  const [taskActions, setTaskActions] = useState({
    add: () => {},
    update: () => {},
    remove: () => {},
  });

  const createTaskService = (db, userId) => {
    const getDocRef = (collectionName, id = null) =>
      id
        ? doc(collection(db, collectionName), id)
        : doc(collection(db, collectionName));

    const add = async (collectionName, data) => {
      const docRef = getDocRef(collectionName);
      await setDoc(docRef, {
        ...data,
        userId,
      });
    };

    const update = async (collectionName, id, data) => {
      const docRef = getDocRef(collectionName, id);
      await updateDoc(docRef, data);
    };

    const remove = async (collectionName, id) => {
      const docRef = getDocRef(collectionName, id);
      await deleteDoc(docRef);
    };

    return { add, update, remove };
  };

  const listenToCollection = (db, collectionName, userId, callback) => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where("userId", "==", userId));
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      callback(data);
    });
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(AUTH, (user) => {
      dispatch({
        type: "INITIALISE",
        payload: { isAuthenticated: !!user, user },
      });
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!state.user) return;

    const unsubscribe = listenToCollection(
      DB,
      "tasks",
      state.user.uid,
      setTasks
    );

    const { add, update, remove } = createTaskService(DB, state.user.uid);
    setTaskActions({ add, update, remove });

    return () => unsubscribe();
  }, [state.user]);

  const login = (email, password) =>
    signInWithEmailAndPassword(AUTH, email, password);

  const register = (email, password) =>
    createUserWithEmailAndPassword(AUTH, email, password);

  const logout = () => signOut(AUTH);

  return (
    <FirebaseContext.Provider
      value={{
        ...state,
        method: "firebase",
        user: state.user,
        tasks,
        login,
        register,
        logout,
        ...taskActions,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export { FirebaseContext, FirebaseProvider };

import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { FIREBASE_API } from "../config";

const firebaseApp = initializeApp(FIREBASE_API);
const AUTH = getAuth(firebaseApp);
const DB = getFirestore(firebaseApp);

const FirebaseContext = createContext({});

function FirebaseProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isInitialized: false,
    user: null,
  });

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(AUTH, (user) => {
      setAuthState({
        isAuthenticated: !!user,
        isInitialized: true,
        user,
      });
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authState.user) return;

    const tasksRef = collection(DB, "tasks");
    const q = query(tasksRef, where("userId", "==", authState.user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(data);
    });

    return () => unsubscribe();
  }, [authState.user]);

  const login = (email, password) =>
    signInWithEmailAndPassword(AUTH, email, password);

  const register = (email, password) =>
    createUserWithEmailAndPassword(AUTH, email, password);

  const logout = () => signOut(AUTH);

  const add = async (collectionName, data) => {
    await addDoc(collection(DB, collectionName), {
      ...data,
      userId: authState.user.uid,
    });
  };

  const update = async (collectionName, id, data) => {
    const docRef = doc(DB, collectionName, id);
    await updateDoc(docRef, data);
  };

  const remove = async (collectionName, id) => {
    const docRef = doc(DB, collectionName, id);
    await deleteDoc(docRef);
  };

  return (
    <FirebaseContext.Provider
      value={{
        ...authState,
        tasks,
        login,
        register,
        logout,
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

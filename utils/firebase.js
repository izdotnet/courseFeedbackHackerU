import { getApps, initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDocs,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

//Sensitive database data hidden in a local env file that's hidden from the user when shipping the app
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

//INIT firebase as long as it hasn't been initialized before
if (getApps().length < 1) initializeApp(firebaseConfig);

//INIT and export an instance of Firestore db
export const db = getFirestore();

//export a function of a collection ref in the db
export async function getColRef(col) {
  const colRef = collection(db, col);
  return colRef;
}

export async function getCollectionData(col) {
  const colRef = await getColRef(col);
  const refSnap = await getDocs(colRef);
  return refSnap.docs;
}

export function addDocToDb(col, value) {
  addDoc(getColRef(col), value);
}

export async function deleteDocFromDb(col, id) {
  const docRef = doc(db, col, id);
  deleteDoc(docRef);
}

export async function getDocById(col, id) {
  try {
    const docRef = doc(db, col, id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (e) {
    console.log(e.message);
  }
}

export async function updateDocById(col, id, data) {
  try {
    const docRef = doc(db, col, id);
    const docSnap = await setDoc(docRef, data, { merge: true });
  } catch (e) {
    console.log(e.message);
  }
}

export async function addData(col, data) {
  try {
    const colRef = collection(db, col);
    addDoc(colRef, data);
  } catch (e) {
    console.log(e.message);
  }
}

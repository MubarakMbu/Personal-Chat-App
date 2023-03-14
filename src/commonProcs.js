import {
    setDoc,
    doc,
    updateDoc,
    getDoc,
  } from "firebase/firestore";
  import { db } from "./firebase";

  //To update database.
export const updateFirestoreDb = async (database, dbid, data) =>{
    const res = await getDoc(doc(db, database, dbid));
    if (res.exists()) {
        await updateDoc(doc(db, database,dbid), data);
    }else{
        await setDoc(doc(db, database, dbid), data);
    }
  }
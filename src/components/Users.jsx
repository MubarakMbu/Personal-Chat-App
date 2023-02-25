import React, { useContext, useEffect, useRef, useState } from "react";
import {collection,
  query,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  orderBy
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import User from "./User";
import Chats from "./Chats";
const Users = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const usersInDb = useRef([]);
  
  useEffect( () => {
    const fetchData = async () => {
      const q = query(
        collection(db, "users"),
        orderBy("displayName"),
      );
      const querySnapshot = await getDocs(q);
      usersInDb.current = querySnapshot.docs;
    };

    fetchData();
  }, []);
  
  const handleChange = (value) => {
    setUsername(value);
    if(value.trim() !== ""){
      setUsers(()=>(
        usersInDb.current.filter((userDoc)=> (userDoc.data().displayName.startsWith(value.trim())))
      ))
    }
  };

  const handleSelect = async (user) => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =(currentUser.uid > user.uid? (currentUser.uid + user.uid) : (user.uid + currentUser.uid));
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err)
    }

    setUsers([]);
    setUsername("")
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a Friend"
          onChange={(e) => handleChange(e.target.value)}
          value={username}
        />
      </div>
      {(username.trim() !== "" && users.length === 0) && <span>User not found!</span>}
      {( username.trim() !== ""  && users.length > 0) && (<div className="searchUsers">{users.map((doc, id) => {
            return (<User key={id} data={doc.data()} clickEvent={handleSelect}></User>)
      })}</div>)}
      {username.trim() === "" && <Chats/>}
    </div>);
};

export default Users;

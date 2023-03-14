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
import { SearchContext } from "../context/SearchContext";
import {ChatContext} from "../context/ChatContext";
import User from "./User";


const Users = () => {
  const [users, setUsers] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const{searchValue, getAndSetSearchValue} = useContext(SearchContext);
  const { dispatch } = useContext(ChatContext);
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
  useEffect( () => {
    const getUsers = ()=>{
      setUsers(()=>{
        if (searchValue.trim() !== ""){
          return usersInDb.current.filter((userDoc)=>(userDoc.data().displayName.startsWith(searchValue)));
        }else{
          return ([]);
      }
      });
    }
    getUsers();
  }, [searchValue]);

  

  const handleSelect = async (user) => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =(currentUser.uid > user.uid? (currentUser.uid + user.uid) : (user.uid + currentUser.uid));
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        // await updateFirestoreDb("userChats",currentUser.uid,{
        //   userInfo: {
        //     uid: user.uid,
        //     displayName: user.displayName,
        //     photoURL: user.photoURL,
        //   },
        //   date: serverTimestamp(),
        // })
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        // await updateFirestoreDb("userChats", user.uid,{
        //   userinfo : {
        //     uid: currentUser.uid,
        //     displayName: currentUser.displayName,
        //     photoURL: currentUser.photoURL,
        //   },
        //   date : serverTimestamp(),
        // });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      dispatch({ type: "CHANGE_USER", payload: user });
    } catch (err) {
      console.log(err)
    }
    setUsers([]);
    getAndSetSearchValue("");
  };
  return (
    <div>
      {searchValue.trim() !== "" && (users.length > 0 ?
        (<div className="users">{users.map((doc, id) => {
            return (<User key={id} data={doc.data()} clickEvent={handleSelect}></User>)
      })}</div>) : 
      <span>User not found!</span>)} 
    </div>);
};

export default Users;

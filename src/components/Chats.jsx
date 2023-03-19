import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { SearchContext } from "../context/SearchContext";
import { db } from "../firebase";
import User from "./User";

const Chats = () => {
  const [chats, setChats] = useState({});
  
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const{searchValue} = useContext(SearchContext);

  useEffect(()=>{
    if (currentUser.uid){
      onSnapshot(doc(db, "userChats", currentUser.uid),(snapshot)=>{
        const data = snapshot.data()
        setChats(data)
    })
    } 
  }, [currentUser.uid]);


  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats" style={searchValue.trim() !== "" ? {display:"none"}:{}} >
      {(searchValue.trim() === "" && Object.keys(chats).length !== 0)  && (Object.entries(chats).sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <User key={chat[0]} data={{userInfo:chat[1].userInfo, lastMsg: chat[1].lastMessage?.text}} clickEvent={handleSelect}></User>
      )))
      }</div>
  )
}
export default Chats;
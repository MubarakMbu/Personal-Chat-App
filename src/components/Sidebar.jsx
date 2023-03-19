import React from "react";
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import Navbar from "./Navbar";
import Users from "./Users";
import Chats from "./Chats";
import Search from "./Search";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar/>
      <Search/>
      <Users/>
      <Chats/>
      <button className="logout" onClick={()=>signOut(auth)}>Logout</button>
    </div>
  );
};

export default Sidebar;

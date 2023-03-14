import React from "react";
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
    </div>
  );
};

export default Sidebar;

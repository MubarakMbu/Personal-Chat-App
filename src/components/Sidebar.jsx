import React from "react";
import Navbar from "./Navbar";
import Users from "./Users";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar/>
      <Users/>
    </div>
  );
};

export default Sidebar;

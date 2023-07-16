import React, { useState } from "react";
import BasicTabs from "@/components/parts/Tabs/TimelineTab";
import { AuthInfo } from "@/context/auth";
import Profile from "./profile";
const Mapage = () => {
  return (
    <div className="profile">
      <div className="profile_right">
      <Profile />
      </div>
      <BasicTabs />
    </div>
  );
};

export default Mapage;

import React from "react";

import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import Link from "next/link";
const DropDown = () => {
  return (
    <div className="header_dropdown">
      <Link href={"/account"} className="link_style">
        <div className="dropdown_list">
          <PersonIcon />
          account
        </div>
      </Link>
      <Link href={"/login"} className="link_style">
        <div className="dropdown_list">
          <LogoutIcon />
          logout
        </div>
      </Link>
      <Link href={"/signup"} className="link_style">
        <div className="dropdown_list">
          <PersonAddIcon />
          sighup
        </div>
      </Link>
      <Link href={"/login"} className="link_style">
        <div className="dropdown_list">
          <LoginIcon />
          login
        </div>
      </Link>
    </div>
  );
};

export default DropDown;

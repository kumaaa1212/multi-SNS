import React from "react";

import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import Link from "next/link";
const DropDown = () => {
  return (
    <div className="header_dropdown">
      <div className="dropdown_list">
        <PersonIcon />
        <Link href={"/account"} className="link_style">
          account
        </Link>
      </div>
      <div className="dropdown_list">
        <LogoutIcon />
        <Link href={"/login"} className="link_style">
          logout
        </Link>
      </div>
      <div className="dropdown_list">
        <PersonAddIcon />
        <Link href={"/signup"} className="link_style">
          sighup
        </Link>
      </div>
      <div className="dropdown_list">
        <LoginIcon />
        <Link href={"/login"} className="link_style">
          login
        </Link>
      </div>
    </div>
  );
};

export default DropDown;

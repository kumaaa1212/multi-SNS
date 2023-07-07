import React from "react";

import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
const DropDown = () => {
  return (
    <div className="header_dropdown">
      <div className="dropdown_list">
        <PersonIcon />
        <Link href={'/'} className="link_style">account</Link>
      </div>
      <div className="dropdown_list">
        <LogoutIcon />
        <Link href={'/'} className="link_style">logout</Link>
      </div>
    </div>
  );
};

export default DropDown;

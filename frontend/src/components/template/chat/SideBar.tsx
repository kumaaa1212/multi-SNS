import React from "react";
import styles from "./Chat.module.scss";
import { AuthInfo } from "@/context/auth";
import ChatSearch from "@/components/parts/Search/ChatSearch";
import ChatSide from "@/components/parts/Chat/ChatSide";
const SideBar = () => {
  const auth = AuthInfo();
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_header}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles.settingIcon}
          width="40"
          height="40"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#000000"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
          <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
        </svg>
        <ChatSearch />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles.addIcon}
          width="40"
          height="40"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#000000"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 20l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4h4z" />
          <path d="M13.5 6.5l4 4" />
          <path d="M16 18h4m-2 -2v4" />
        </svg>
      </div>
      <div className={styles.chat_person}>
        <ChatSide />
        <ChatSide />
        <ChatSide />
        <ChatSide />
      </div>
    </div>
  );
};

export default SideBar;

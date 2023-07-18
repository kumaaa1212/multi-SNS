import React from "react";
import styles from "./Chat.module.scss";
import Image from "next/image";
import Img from "../../../../public/testImg1.jpg";
import ChatContent from "@/components/parts/Chat/ChatContent";
const ChatRoom = () => {
  return (
    <div className={styles.chatroom}>
      <ChatContent />
    </div>
  );
};

export default ChatRoom;

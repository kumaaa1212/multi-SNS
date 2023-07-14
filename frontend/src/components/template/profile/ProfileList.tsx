import React, { useContext } from "react";
import styles from "./Prolife.module.scss";
import Image from "next/image";
import TestImg from "../../../../public/testImg1.jpg";
import { AuthContext } from "@/context/auth";
const ProfileList = () => {
  const auth = useContext(AuthContext)
  return (
    <div className={styles.detail_profile}>
      <Image
        width={200}
        height={200}
        alt=""
        src={auth ? auth?.icon : TestImg}
        className={styles.img}
      />
      <ul>
        <li className={styles.list}>
          <p>NAME</p>
          <p>{auth.username}</p>
        </li>
        <li className={styles.list}>
          <p>TEAM</p>
          <p>{auth.team}</p>
        </li>
        <li className={styles.list}>
          <p>FOLLOW</p>
          <p>10</p>
          <p>FOllOWER</p>
          <p>10</p>
        </li>
      </ul>
    </div>
  );
};

export default ProfileList;

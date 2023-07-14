import { Paper, Tab, Tabs, TextField } from "@mui/material";
import React from "react";
import styles from "./Prolife.module.scss";
import Image from "next/image";
import bg_img from "../../../../public/bg_img.jpg";
import profile_img from "../../../../public/profile_img.jpg";
import FixedBottomNavigation from "@/components/parts/Navigation";
import BasicTabs from "@/components/parts/Tabs/TimelineTab";
const Profile = () => {
  return (
    <div className="profile">
      <div className={styles.profile_left}>
        <Paper elevation={2} className={styles.container}>
          <div className={styles.image_area}>
          <Image src={bg_img} alt={""} className={styles.bg_img} />
          <Image src={profile_img} alt={""} className={styles.profile_img} />
          </div>
          <div>
            <span>Follo</span>
            <span>Follower</span>
            <span>Rank</span>
          </div>
          <div className={styles.detail_profile}>
            <span>NAME</span>
            <TextField id="outlined-basic" label="NAME" variant="outlined" />
          </div>
          <div className={styles.detail_profile}>
            <span>TEAM</span>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
          </div>
          <div className={styles.detail_profile}>
            <span>自己紹介</span>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              value={
                "初めまして、私はFC東京のサポーターの暦10年のKUMAと申します。今まで沢山の試合に行ってます"
              }
            />
          </div>
          <div className={styles.detail_profile}>
            <span>総観戦数</span>
          </div>
        </Paper>
      </div>
      <BasicTabs/>
    </div>
  );
};

export default Profile;

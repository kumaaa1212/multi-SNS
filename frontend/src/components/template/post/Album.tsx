import SwitchBtn from "@/components/parts/Button/SwitchBtn";
import React from "react";
import styles from "./Post.module.scss";
import { Paper } from "@mui/material";
const Album = () => {
  return (
    <div>
      <div className={styles.album_header}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-arrow-left"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="#000000"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
          <path d="M5 12l6 6" />
          <path d="M5 12l6 -6" />
        </svg>
        <div className={styles.header_right}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-chart-candle"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="#000000"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
            <path d="M6 4l0 2" />
            <path d="M6 11l0 9" />
            <path d="M10 14m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
            <path d="M12 4l0 10" />
            <path d="M12 19l0 1" />
            <path d="M16 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
            <path d="M18 4l0 1" />
            <path d="M18 11l0 9" />
          </svg>
          <SwitchBtn/>
          <button>下書き保存</button>
          {/* <button>公開</button> */}
        </div>
      </div>
      <div>
        <input type="text" placeholder="title" />
        <div>
        <Paper elevation={5} className={styles.container}>
          <textarea name=""/>
        </Paper>
        </div>
      </div>
    </div>
  );
};

export default Album;

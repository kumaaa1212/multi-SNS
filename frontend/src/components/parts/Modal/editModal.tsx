import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { supabase } from "@/utils/supabaseClient";
import { AuthInfo } from "@/context/auth";
import styles from "./Modal.module.scss";
import Image from "next/image";
import bg_img from "../../../../public/bg_img.jpg";
import profile_img from "../../../../public/profile_img.jpg";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  paddingTop: 2,
  paddingLeft: 2,
  paddingRight: 2,
  borderRadius: 5,
};
interface OpenProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function EditModal(props: OpenProps) {
  const auth = AuthInfo();
  console.log(auth);
  const { open, setOpen } = props;
  const [file, setFile] = useState<any>(null);
  const [editName, setEditName] = useState<string>(auth.username);
  const [editIntro, seteditIntro] = useState<string>(auth.bio);
  const [editIcon, seteditIcon] = useState<string>(auth.icon);
  function openFileInput() {
    const fileInput = document.getElementById("fileInput");
    fileInput?.click();
  }

  // async function handleFileSelect(e: any) {
  //   const selectedFile = e.target.files![0];
  //   await supabase.storage
  //     .from("avatars")
  //     .upload(`avatars/${selectedFile.name}`, selectedFile, {
  //       cacheControl: "3600",
  //       upsert: false,
  //     });
  //   seteditIcon(selectedFile.name);
  // }
  console.log(editIcon);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    supabase.storage
      .from("avatars")
      .getPublicUrl(`avatars/${editIcon}`);
    await supabase.auth.updateUser({
      data: { username: editName, bio: editIntro, icon: 'mhnfgbdrvsfeadwserdgfnscd' },
    });
    setOpen(!open);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={styles.handle_area}>
          <button onClick={handleSubmit} className={styles.save_btn}>
            保存
          </button>
          <button onClick={() => setOpen(!open)} className={styles.close_btn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
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
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className={styles.image_area}>
          <Image
            src={bg_img}
            alt={""}
            className={styles.bg_img}
            width={600}
            height={250}
          />
          <span className={styles.edit_bgImg}>
            <svg
              onClick={() => openFileInput()}
              xmlns="http://www.w3.org/2000/svg"
              className={styles.icon}
              width="68"
              height="68"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
              <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.icon}
              width="68"
              height="68"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
            <input
              type="file"
              id="bg_fileInput"
              style={{ display: "none" }}
              onChange={(e) => handleFileSelect(e)}
            />
          </span>
          <Image
            src={auth.username ? auth.icon : profile_img}
            alt={""}
            className={styles.profile_img}
            width={150}
            height={150}
            priority={false}
          />
          <span className={styles.edit_profile} onClick={() => openFileInput()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-camera"
              width="68"
              height="68"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
              <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
            </svg>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => handleFileSelect(e)}
            />
          </span>
        </div>
        <div className="input_area">
          <TextField
            id="outlined-basic"
            label="NAME"
            variant="outlined"
            onChange={(e) => setEditName(e.target.value)}
            value={editName}
          />
          <textarea
            className={styles.bio_input}
            value={editIntro}
            onChange={(e) => seteditIntro(e.target.value)}
          />
        </div>
      </Box>
    </Modal>
  );
}
{
  /* <CircularProgress color="inherit" /> */
}

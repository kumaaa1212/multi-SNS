import React from "react";
import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import Link from "next/link";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface OpenProps {
  open?: boolean;
  email?: string;
  text?:string;
  content:any
}
const ModalWind = (props: OpenProps) => {
  const { open, email ,text,content} = props;
  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {open ? (
          <div>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {content}
              {email}
              {text}
            </Typography>
            <Link href={"/login"}>閉じる</Link>
          </div>
        ) : (
          <CircularProgress color="inherit" />
        )}
      </Box>
    </Modal>
  );
};

export default ModalWind;

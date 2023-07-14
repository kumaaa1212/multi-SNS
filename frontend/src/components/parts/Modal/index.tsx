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
import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
interface OpenProps {
  isLoading: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
}
const ModalWind = (props:OpenProps) => {
  const { isLoading,open, setOpen,email} = props;
  return (
    <Modal
      open={true}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {isLoading ? (<CircularProgress color="inherit" />) : ( <div><Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {email}に登録完了メールを送りました。メール内のリンクをクリックして登録を完了してください。
        </Typography><Link href={'/login'}>閉じる</Link></div>)}
      </Box>
    </Modal>
  );
};

export default ModalWind;

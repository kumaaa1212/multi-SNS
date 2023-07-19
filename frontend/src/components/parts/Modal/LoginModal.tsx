import React  from "react";
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
type PropsChildren1Props = {
  children: React.ReactNode
};

const ModalWind = ({children}:PropsChildren1Props) => {
  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalWind;

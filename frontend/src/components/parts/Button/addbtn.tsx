import {useState} from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import Link from "next/link";
import { useRouter } from "next/router";

const actions = [
  { icon: <FileCopyIcon />, name: "Post", href: "/post" },
  { icon: <SaveIcon />, name: "Save", href: "/post" },
  { icon: <PrintIcon />, name: "Print", href: "/post" },
  { icon: <ShareIcon />, name: "Share", href: "/post" },
];

export default function ControlledOpenSpeedDial() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => router.push(action.href)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

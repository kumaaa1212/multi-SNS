import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import RecipeReviewCard from "../Card";
import styles from "./Tabs.module.scss";
import { Skeleton } from "@mui/material";
import CustomizedInputBase from "../Search/PostSearch";
import ControlledOpenSpeedDial from "../Button/addbtn";
import TweetModal from "../Modal/TweetModal";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <span>{children}</span>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="timeline_tab">
      {open && <TweetModal open={open} setOpen={setOpen} />}
      <Box sx={{ width: "100%" }}>
        <div className={styles.tab_header}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              centered
            >
              <Tab label="Post" {...a11yProps(0)} disableRipple />
              <Tab label="Like" {...a11yProps(1)} disableRipple />
              <Tab label="BookMark" {...a11yProps(2)} disableRipple />
            </Tabs>
          </Box>
          <CustomizedInputBase />
        </div>
        <CustomTabPanel value={value} index={0}>
          <RecipeReviewCard />
          <RecipeReviewCard />
          <RecipeReviewCard />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <RecipeReviewCard />
          <RecipeReviewCard />
          <RecipeReviewCard />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <RecipeReviewCard />
          <RecipeReviewCard />
          <RecipeReviewCard />
        </CustomTabPanel>
      </Box>
      <div className="add_btn">
        <ControlledOpenSpeedDial setOpen={setOpen} />
      </div>
    </div>
  );
}

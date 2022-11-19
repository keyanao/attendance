import * as React from "react";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import SideMenu from "./sidemenu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button sx={{ marginTop: "21px" }} onClick={handleClickOpen}>
            {/* 設定ボタン */}
            <SettingsIcon />
          </Button>
          <SwipeableDrawer anchor="right" open={open} onClose={handleClose}>
            <SideMenu />
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

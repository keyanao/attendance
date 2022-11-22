import "../../style/sidemenu.css";
import * as React from "react";
import JoinGroup from "../../component/dialogmenu/joinGroup"
import MakeGroup from "../../component/dialogmenu/makeGroup";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { auth } from "../../FirebaseConfig";

export default function DialogMenu() {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  localStorage.setItem("uid", auth.currentUser.uid);
  const uid = localStorage.getItem("uid");
  console.log(auth.currentUser.uid)
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleClose1 = (value) => {
    setOpen1(false);
    setSelectedValue(value);
  };

  return (
    <div className="dialog-menu">
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          width: "30%",
          height: "200px",
          fontSize: "40px",
          color: "white",
          marginRight: "100px",
        }}
      >
        グループを作る
      </Button>
      <MakeGroup
        // selectedValue={selectedValue}
        uid={uid}
        open={open}
        onClose={handleClose}
      />
      <Button
        variant="contained"
        onClick={handleClickOpen1}
        sx={{
          width: "30%",
          height: "200px",
          fontSize: "40px",
          color: "white",
        }}
      >
        グループに入る
      </Button>
      <JoinGroup
        // selectedValue={selectedValue}
        uid={uid}
        open={open1}
        onClose={handleClose1}
      />
    </div>
  );
}

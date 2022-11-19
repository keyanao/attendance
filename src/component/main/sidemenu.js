import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddIcon from "@mui/icons-material/Add";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import SuccessGroup from "./successgroup";
import MakeReport from "./makereport"
import { auth } from "../../FirebaseConfig";


export default function SideMenu(props) {
  const [open, setOpen] = React.useState(false);
  // const [open1, setOpen1] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  const navigate = useNavigate();

  const Logout = async () => {
    await signOut(auth);
    navigate("/");
    localStorage.removeItem("id");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Box sx={{ width: "auto" }} role="presentation">
      <List>
        <div className="groupname">
          <SuccessGroup/>
        </div>
        <div className="member">
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"メンバー"}></ListItemText>
          </ListItemButton>
        </div>
        <div className="check">
          <ListItemButton>
            <ListItemIcon>
              <CheckBoxIcon />
            </ListItemIcon>
            <ListItemText primary={"レポート確認"}></ListItemText>
          </ListItemButton>
        </div>
        <div className="make">
          <ListItemButton onClick={handleClickOpen}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={"レポート作成"}></ListItemText>
          </ListItemButton>
          <MakeReport
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </div>
        <Divider />
        <div className="logout">
          <ListItemButton onClick={Logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"ログアウト"}></ListItemText>
          </ListItemButton>
        </div>
      </List>
    </Box>
  );
}

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
import SuccessGroup from "./successGroup";
import MakeReport from "./makeReport";
import { auth } from "../../FirebaseConfig";
import CircularProgress from "@mui/material/CircularProgress";
import SimpleDialog from "./createMemberPage";

export default function SideMenu(props) {
  // console.log(props.groupId);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [selectedValue1, setSelectedValue1] = React.useState("");
  const navigate = useNavigate();

  const Logout = async () => {
    await signOut(auth);
    navigate("/");
    localStorage.removeItem("uid");
  };

  const handleMakeReport = () => {
    setOpen(true);
  };

  const handleCloseMakeReport = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleCheckmenber = () => {
    setOpen1(true);
  };

  const handleCloceCheckmenber = (value) => {
    setOpen1(false);
    setSelectedValue1(value);
  };

  const handleCheckReport = () => {
    navigate("/Report",{state:props.groupId});
  };

  return (
    <List>
      {props.isLoading ? (
        <div className="groupname">
          <SuccessGroup groupId={props.groupId} />
        </div>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      <div className="member">
        <ListItemButton onClick={handleCheckmenber}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={"メンバー"}></ListItemText>
        </ListItemButton>
        <SimpleDialog
          selectedValue={selectedValue1}
          open={open1}
          onClose={handleCloceCheckmenber}
          attends={props.attends}
        />
      </div>
      <div className="check">
        <ListItemButton onClick={handleCheckReport}>
          <ListItemIcon>
            <CheckBoxIcon />
          </ListItemIcon>
          <ListItemText primary={"レポート確認"}></ListItemText>
        </ListItemButton>
      </div>
      <div className="make">
        <ListItemButton onClick={handleMakeReport}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={"レポート作成"}></ListItemText>
        </ListItemButton>
        <MakeReport
          selectedValue={selectedValue}
          open={open}
          onClose={handleCloseMakeReport}
          groupId={props.groupId}
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
  );
}

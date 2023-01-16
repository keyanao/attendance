import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddIcon from "@mui/icons-material/Add";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import SuccessGroup from "./successgroup";
import MakeReport from "./makereport";
import { auth } from "../../FirebaseConfig";
import CircularProgress from "@mui/material/CircularProgress";

export default function SideMenu(props) {
  // console.log(props.groupId);
  const [makeReportOpen, setMakeReportOpen] = React.useState(false);
  const [checkMemberOpen, setCheckMemberOpen] = React.useState(false);
  const [selectedReportValue, setSelectedReportValue] = React.useState("");
  const [selectedMemberValue, setSelectedMemberValue] = React.useState("");
  const navigate = useNavigate();

  const Logout = async () => {
    await signOut(auth);
    navigate("/");
    localStorage.removeItem("uid");
  };

  const handleMakeReport = () => {
    setMakeReportOpen(true);
  };

  const handleCloseMakeReport = (value) => {
    setMakeReportOpen(false);
    setSelectedReportValue(value);
  };

  const handleCheckmenber = () => {
    setCheckMemberOpen(true);
  };

  const handleCloceCheckmenber = (value) => {
    setCheckMemberOpen(false);
    setSelectedMemberValue(value);
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
      {/* <div className="member">
        <ListItemButton onClick={handleCheckmenber}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={"メンバー"}></ListItemText>
        </ListItemButton>
        <CreateMemberPage
          selectedMemberValue={selectedMemberValue}
          setCheckMemberOpen={checkMemberOpen}
          onClose={handleCloceCheckmenber}
          attends={props.attends}
        />
      </div> */}
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
          selectedReportValue={selectedReportValue}
          makeReportOpen={makeReportOpen}
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

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MainContent from "../../component/main/mainContent";
import SideMenu from "../../component/main/sidemenu";
import { getGroupInfo } from "../../api/groupInfo";
import { getUserInfo } from "../../api/getUserInfo";
import { updateAttend } from "../../api/updataAttend";
import { updateAbsebce } from "../../api/updataAttend";
import Button from "@mui/material/Button";
import { TimeView } from "../../component/main/timeView";
import { timePlusApi } from "../../api/timePlusApi";
import CircularProgress from "@mui/material/CircularProgress";

const drawerWidth = 240;

export default function Main() {
  const [judge, setJudge] = useState();
  const [localJudge, setLocalJudge] = useState();
  const [attends, setAttends] = useState([]);
  const [attendTime, setAattendTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(true);
  const [groupLat, setGroupLat] = useState();
  const [groupLng, setGroupLng] = useState();
  const uid = localStorage.getItem("uid");
  const [groupName, setGroupName] = useState();
  const [groupId, setGroupId] = useState();

  const handleAttendanceClick = () => {
    //出席時間
    console.log("出席");
    setJudge(true);
    attends[0].attend = true;
    updateAttend(uid);
    setAattendTime(new Date());
  };

  const handleAbsenceClick = () => {
    //退席時間
    console.log("退席");
    setIsLoading2(false);
    attends[0].attend = false;
    setJudge(false);
    const absenceTime = new Date();
    const diff = (absenceTime - attendTime) / 1000 / 60 / 60; //在籍時間
    console.log(diff);
    const minute = Math.round(diff * 10) / 10;
    updateAbsebce(uid, minute).then(() => {
      timePlusApi(uid, setIsLoading2).then((data) => {
        setAttends(data);
        setJudge(data[0].attend);
      });
    });
  };

  const checkCurrentPosition = () => {
    //現在地取得
    let nowlat = 0;
    let nowlng = 0;
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      nowlat = Math.round(latitude * 1000) / 1000; //緯度
      nowlng = Math.floor(longitude * 1000) / 1000; //経度
      if (nowlat === groupLat && nowlng === groupLng) {
        setLocalJudge(true);
      } else {
        setLocalJudge(false);
      }
    });
  };
  setInterval(checkCurrentPosition, 1000);

  useEffect(() => {
    getUserInfo(uid, setIsLoading).then((data) => {
      console.log(data);
      setAttends(data);
      setJudge(data[0].attend);
    });
    getGroupInfo(uid).then((data) => {
      setGroupName(data.groupName);
      setGroupId(data.id);
      setGroupLat(data.lat);
      setGroupLng(data.lng);
    });
  }, [uid]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {isLoading ? (
            <Typography variant="h6" noWrap component="div">
              {groupName}
            </Typography>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}
          <Typography variant="h6">
            <TimeView judge={judge} />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <SideMenu groupId={groupId} attends={attends} isLoading={isLoading} />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              disabled={localJudge ? (judge ? true : false) : true}
              variant="contained"
              onClick={handleAttendanceClick}
              sx={{
                width: "250px",
                height: "100px",
                fontSize: "40px",
                marginBottom: "10px",
                // marginLeft: "250px",
                // marginBottom: "10px",
              }}
            >
              出席
            </Button>
            <Button
              disabled={localJudge ? (!judge ? true : false) : true}
              variant="contained"
              onClick={handleAbsenceClick}
              sx={{
                width: "250px",
                height: "100px",
                fontSize: "40px",
                marginBottom: "10px",
                marginLeft: "10px",
                // marginBottom: "10px",
              }}
            >
              退席
            </Button>
          </div>
        ) : (
          ""
        )}

        <MainContent
          isLoading={isLoading}
          attends={attends}
          isLoading2={isLoading2}
        />
      </Box>
    </Box>
  );
}

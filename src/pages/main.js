import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MainContent from "../components/main/mainContent";
import SideMenu from "../components/main/sidemenu";
import { getGroupInfo } from "../api/main/groupInfo";
import { getUserInfo } from "../api/main/getUserInfo";
import { updateAttend } from "../api/main/updataAttend";
import { updateAbsebce } from "../api/main/updataAttend";
import Button from "@mui/material/Button";
import { TimeView } from "../components/main/timeView";
import CircularProgress from "@mui/material/CircularProgress";
import toast, { Toaster } from "react-hot-toast";

export const notify = () => toast("レポートを投稿しました");
const drawerWidth = 240;

export default function Main() {
  const [isAttended, setIsAttended] = useState(); //false入れると時間が継続されない
  const [localJudge, setLocalJudge] = useState(false);
  const [attends, setAttends] = useState([]);
  const [attendTime, setAattendTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [groupLat, setGroupLat] = useState();
  const [groupLng, setGroupLng] = useState();
  const [groupName, setGroupName] = useState();
  const [groupId, setGroupId] = useState();
  const uid = localStorage.getItem("uid");
  const refX = useRef(groupLat);
  const refy = useRef(groupLng);


  const handleAttendanceClick = () => {
    //出席時間
    console.log("出席");
    setIsAttended(true);
    attends[0].attend = true;
    updateAttend(uid);
    setAattendTime(new Date());
  };

  const handleAbsenceClick = () => {
    //退席時間
    console.log("退席");
    setIsLoading2(false);
    attends[0].attend = false;
    setIsAttended(false);
    const absenceTime = new Date();
    const diff = (absenceTime - attendTime) / 1000 / 60 / 60; //在籍時間
    // const diff = (absenceTime - attendTime) / 1000; //試し
    const minute = Math.round(diff * 10) / 10;
    updateAbsebce(uid, minute).then(() => {
      getUserInfo(uid, setIsLoading2).then((data) => {
        setAttends(data);
        setIsAttended(data[0].attend);
      });
    });
  };

  const checkCurrentPosition = async (lat, lng) => {
    //現在地取得
    let nowlat = 0;
    let nowlng = 0;
    let positions = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const { latitude, longitude } = positions?.coords;
    nowlat = Math.round(latitude * 1000) / 1000; //緯度
    nowlng = Math.floor(longitude * 1000) / 1000; //経度
    if (nowlat === lat.current && nowlng === lng.current) {
      setLocalJudge(true);
    } else {
      setLocalJudge(false);
    }
  };

  useEffect(() => {
    getUserInfo(uid, setIsLoading, setIsLoading2).then((data) => {
      setAttends(data);
      setIsAttended(data[0].attend);
    });

    getGroupInfo(uid).then((data) => {
      setGroupName(data.groupName);
      setGroupId(data.id);
      setGroupLat(data.lat);
      setGroupLng(data.lng);
    });
    setInterval(() => {
      checkCurrentPosition(refX, refy);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refX.current = groupLat;
    refy.current = groupLng;
  }, [groupLat, groupLng]);

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
            <TimeView isAttended={isAttended} />
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
              disabled={localJudge & !isAttended ? false : true}
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
              disabled={localJudge & isAttended ? false : true}
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
            <Toaster />
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

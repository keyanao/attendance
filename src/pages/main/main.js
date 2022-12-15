import React, { useEffect, useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Sidebar from "../../component/main/sidebar";
import { getGroupInfo } from "../../api/groupInfo";
import { weekTime } from "../../api/weekTime";
import { monthTime } from "../../api/monthTime";
import { getUserInfo } from "../../api/getUserInfo";
import { updateAttend } from "../../api/updataAttend";
import { updateAbsebce } from "../../api/updataAttend";

const columns = [
  {
    id: "name",
    label: "名前",
    minWidth: 170,
    align: "left",
  },
  {
    id: "attend",
    label: "状況",
    minWidth: 30,
    align: "center",
    format: (value) => (value ? "出席" : "退席"),
  },
  {
    id: "weekTime",
    label: "週間",
    minWidth: 170,
    align: "right",
  },
  {
    id: "monthTime",
    label: "月間",
    minWidth: 170,
    align: "right",
  },
  {
    id: "report",
    label: "レポート数",
    minWidth: 170,
    align: "right",
  },
];

export default function Main() {
  const [judge, setJudge] = useState();
  const [localJudge, setLocalJudge] = useState(false);
  const [attends, setAttends] = useState([]);
  const [attendTime, setAattendTime] = useState(new Date());
  const [isAvailable, setAvailable] = useState(false);
  const [groupId, setGroupId] = useState();
  const [groupName, setGroupName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [groupLat, setGroupLat] = useState();
  const [groupLng, setGroupLng] = useState();
  const auth = getAuth();
  const name = [];
  const uid = localStorage.getItem("uid");

  // useEffectが実行されているかどうかを判定するために用意しています
  const isFirstRef = useRef(true);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      localStorage.setItem("uid", uid);
    } else {
    }
  });

  const handleAttendanceClick = () => {
    //出席時間
    setJudge(true);
    attends[0].attend = true;
    updateAttend(uid);
    setAattendTime(new Date());
    checkCurrentPosition();
  };

  const handleAbsenceClick = () => {
    //退席時間
    attends[0].attend = false;
    setJudge(false);
    updateAbsebce(uid);
    const absenceTime = new Date();
    const diff = (absenceTime - attendTime) / 60; //在籍時間
    const minute = Math.round(diff * 10) / 10;
    
  };

  const checkCurrentPosition = () => {//位置情報確認
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

  checkCurrentPosition();

  useEffect(() => {
    isFirstRef.current = false;
    if ("geolocation" in navigator) {
      setAvailable(true);
    }
  }, [isAvailable]);

  useEffect(() => {
    getUserInfo(uid, setIsLoading).then((data) => {
      setAttends(data);
      setJudge(data[0].attend);
    });
    weekTime(uid);
    monthTime(uid);
    getGroupInfo(uid).then((data) => {
      setGroupId(data.id);
      setGroupName(data.groupName);
      setGroupLat(data.lat);
      setGroupLng(data.lng);
    });
  }, []);
  // console.log("groupLat", groupLat);
  // console.log("groupLng", groupLng);

  return (
    <>
      {isLoading ? (
        <>
          <div className="bar" style={{ display: "flex" }}>
            {attends.map((data) => {
              name.push(data);
            })}
            <Sidebar groupId={groupId} name={name} />
            <h2>{groupName}</h2>
          </div>
          <Button
            disabled={localJudge ? (judge ? true : false) : true}
            variant="contained"
            onClick={handleAttendanceClick}
          >
            出席
          </Button>
          <Button
            disabled={localJudge ? (!judge ? true : false) : true}
            variant="contained"
            onClick={handleAbsenceClick}
          >
            退席
          </Button>
          <Paper sx={{ width: "100%" }}>
            <TableContainer sx={{ height: "100%" }}>
              <Table aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{
                          background: "#C0C0C0",
                          fontWeight: "bolder",
                          minWidth: column.minWidth,
                          height: 50,
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attends.map((attend) => {
                    return (
                      <>
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={attend.id}
                        >
                          {columns.map((column) => {
                            const value = attend[column.id];
                            return (
                              <TableCell
                                key={value.id}
                                align={column.align}
                                sx={{ top: "100px", height: 50 }}
                              >
                                {column.format ? column.format(value) : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

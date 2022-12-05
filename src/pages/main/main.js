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
import { getGroupInfo } from "../../api/groupname";
import { weekTime } from "../../api/weekTime";
import { monthTime } from "../../api/monthTime";
import { getUserInfo } from "../../api/getUserInfo";

const columns = [
  {
    id: "name",
    label: "名前",
    minWidth: 170,
    align: "left",
  },
  { id: "attend", label: "状況", minWidth: 10, align: "center" },
  {
    id: "weekTime",
    label: "週間",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "monthTime",
    label: "月間",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "report",
    label: "レポート数",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

export default function Main() {
  const [attend, setAttend] = useState([]);
  const [status, setStatus] = useState();
  const [attendTime, setAattendTime] = useState(new Date());
  const [isAvailable, setAvailable] = useState(false);
  const [groupId, setGroupId] = useState();
  const [groupName, setGroupName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();
  const uid = localStorage.getItem("uid");

  // useEffectが実行されているかどうかを判定するために用意しています
  const isFirstRef = useRef(true);

  function createData(status) {
    if (status) {
      status = "出席";
    } else {
      status = "退席";
    }
    return { status };
  }

  const rows = [createData()];

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      localStorage.setItem("uid", uid);
    } else {
    }
  });

  const handleAttendanceClick = () => {
    //出席時間
    setStatus(true);
    setAattendTime(new Date());
    checkCurrentPosition();
  };

  const handleAbsenceClick = () => {
    //退席時間
    const absenceTime = new Date();
    const diff = absenceTime - attendTime;
    setStatus(false);
    // console.log(Math.floor(diff / 1000 / 60), "分"); //在籍時間
  };

  const checkCurrentPosition = () => {
    //現在地取得
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      // setPosition({ latitude, longitude });
      let lat1 = Math.round(latitude * 1000) / 1000;
      let lng1 = Math.floor(longitude * 1000) / 1000;
      // console.log("現在地の緯度", lat1); //緯度
      // console.log("現在地の経度", lng1); //経度
    });
  };

  useEffect(() => {
    isFirstRef.current = false;
    if ("geolocation" in navigator) {
      setAvailable(true);
    }
  }, [isAvailable]);

  useEffect(() => {
    getUserInfo(uid).then((data) => {
      setAttend(data);
      setIsLoading(true);
      console.log("data", data)
    });
    weekTime();
    monthTime();
    getGroupInfo(uid).then((data) => {
      setGroupId(data.id);
      setGroupName(data.groupName);
    });
    checkCurrentPosition();
  }, [uid]);

  return (
    <>
      {isLoading ? (
        <>
          <div className="bar" style={{ display: "flex" }}>
            <Sidebar groupId={groupId} />
            <h2>{groupName}</h2>
          </div>
          <Button
            disabled={status}
            variant="contained"
            onClick={handleAttendanceClick}
          >
            出席
          </Button>
          <Button
            disabled={!status}
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
                  {attend.map((attend) => {
                    delete attend.id;
                    console.log(attend);
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={attend.name}
                      >
                        {columns.map((column) => {
                          const value = attend[column.id];
                          return (
                            <TableCell
                              key={value}
                              align={column.align}
                              sx={{ top: "100px", height: 50 }}
                            >
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
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

import React, { useEffect, useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { onAuthStateChanged } from "firebase/auth";
import {
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../../FirebaseConfig";
import Sidebar from "../../component/main/sidebar";
// import { ConstructionOutlined } from "@mui/icons-material";

const columns = [
  {
    id: "name",
    label: "名前",
    minWidth: 170,
  },
  { id: "status", label: "状況", minWidth: 10 },
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
    id: "reportNum",
    label: "レポート数",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

export default function Main() {
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(100);
  const [status, setStatus] = useState();
  const [uname, setUname] = useState("大久保");
  const [attendTime, setAattendTime] = useState(new Date());
  const [isAvailable, setAvailable] = useState(false);
  // const [setPosition] = useState({ latitude: null, longitude: null });
  // const navigate = useNavigate();

  // useEffectが実行されているかどうかを判定するために用意しています
  const isFirstRef = useRef(true);

  function createData(name, status, weekTime, monthTime, reportNum) {
    if (status) {
      status = "出席";
    } else {
      status = "退席";
    }
    return { name, status, weekTime, monthTime, reportNum };
  }

  const rows = [createData("大久保", status, 10, 93, 9)];

  //グループや人の情報取得
  // const data = () => {
  //   onAuthStateChanged(auth, async (user) => {
  //     const docRef = doc(db, "userInfo", user.uid);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       setUname(docSnap.data().name);
  //     }
  //   });
  // };

  //グループメンバーの全データを取得できる
  const datag = async () => {
    let gId;
    const docRef = doc(db, "userInfo", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      gId = docSnap.data().groupId;
    } else {
      console.log("No such document!");
    }

    const q = query(collection(db, "userInfo"), where("groupId", "==", gId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setUname(doc.data().name);
    });
  };

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
    // data();
    datag();
    checkCurrentPosition();
  }, []);

  return (
    <>
      {uname ? (
        <>
          <div className="bar" style={{ display: "flex" }}>
            <Sidebar />
            <h2>B5研究室{/* 最終的にはグループ名をdbから取ってくる */}</h2>
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
          {/* <Button onClick={()=>Logout()}>ログアウト</Button> */}
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
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{ top: "100px", height: 50 }}
                              >
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
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
        ""
      )}
    </>
  );
}

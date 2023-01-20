import React, { useEffect, useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { weekTime } from "../../api/weekTime";
import { monthTime } from "../../api/monthTime";

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
    label: "週間(時間)",
    minWidth: 170,
    align: "right",
  },
  {
    id: "monthTime",
    label: "月間(時間)",
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

export default function MainContent(props) {
  const [isAvailable, setAvailable] = useState(false);
  const auth = getAuth();
  const uid = localStorage.getItem("uid");
  // // useEffectが実行されているかどうかを判定するために用意しています
  const isFirstRef = useRef(true);
  // console.log(props);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      localStorage.setItem("uid", uid);
    } else {
    }
  });

  useEffect(() => {
    isFirstRef.current = false;
    if ("geolocation" in navigator) {
      setAvailable(true);
    }
  }, [isAvailable]);

  useEffect(() => {
    weekTime(uid);
    monthTime(uid);
  }, [uid]);

  return (
    <>
      {props.isLoading ? (
        <>
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
                {props.isLoading2 ? (
                  <TableBody>
                    {props.attends.map((attend) => {
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
                                  key={column.id}
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
                ) : (
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                )}
              </Table>
            </TableContainer>
          </Paper>
        </>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

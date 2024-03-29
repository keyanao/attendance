import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation } from "react-router-dom";
import { getReportInfo } from "../api/report/getReportInfo";
import format from "date-fns/format";
import ja from "date-fns/locale/ja";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteReport } from "../api/report/deleteReport";
import EditReport from "../components/report/editReport";

export default function Report() {
  const location = useLocation();
  const [editCheck, setEditCheck] = useState(false);
  const groupId = location.state;
  const uid = localStorage.getItem("uid");
  const [report, setReport] = useState();
  const navigate = useNavigate();
  const [editReportOpen, setEditReportOpen] = useState(false);
  const [reportDate, setReportDate] = useState();

  const BackButton = () => {
    navigate("/main");
  };

  const reportDelete = (date) => {
    if (window.confirm("入力内容を消去しますか")) {
      deleteReport(uid, groupId, date).then(() => {
        getReportInfo(uid, groupId).then((data) => {
          setReport(data);
        });
      });
    }
  };

  const handleEditReport = (date) => {
    setEditReportOpen(true);
    setEditCheck(true);
    setReportDate(date);
  };

  const handleCloseEditReport = (value) => {
    setEditReportOpen(false);
    setEditCheck(false);
  };

  useEffect(() => {
    getReportInfo(uid, groupId).then((data) => {
      setReport(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h2>レポート一覧</h2>
        <Button onClick={() => BackButton()} sx={{ marginLeft: "30%" }}>
          戻る
        </Button>
      </div>
      {report &&
        report.map((conducts) => {
          let fnsH = format(conducts.date.toDate(), "yyyy年M月d日(E) HH:mm", {
            locale: ja,
          });
          return (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backGround: "ccc",
                  flexWrap: "wrap",
                }}
                key={conducts.id}
              >
                <EditIcon
                  onClick={() => {
                    handleEditReport(conducts.date);
                  }}
                  sx={{
                    "&:hover": {
                      color: "steelblue",
                    },
                  }}
                />
                <EditReport
                  editReportOpen={editReportOpen}
                  handleCloseEditReport={handleCloseEditReport}
                  reportDate={reportDate}
                  groupId={groupId}
                  editCheck={editCheck}
                  setReport={setReport}
                />
                <DeleteIcon
                  onClick={() => {
                    reportDelete(conducts.date);
                  }}
                  sx={{
                    "&:hover": {
                      color: "steelblue",
                    },
                  }}
                />
                <Accordion
                  key={conducts.id}
                  sx={{
                    width: "700px",
                    "&:hover": {
                      bgcolor: "beige",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{fnsH}</Typography>
                    <div style={{ marginLeft: "auto" }}></div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <h3>今日やったこと</h3>
                    <Typography sx={{ wordBreak: "break-all" }}>
                      {conducts.conduct}
                    </Typography>
                    <h3>次回やること</h3>
                    <Typography sx={{ wordBreak: "break-all" }}>
                      {conducts.plan}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </>
          );
        })}
    </div>
  );
}

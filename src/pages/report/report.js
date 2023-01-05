import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation } from "react-router-dom";
import { getReportInfo } from "../../api/getReportInfo";
import format from "date-fns/format";
import ja from "date-fns/locale/ja";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Report(props) {
  const location = useLocation();
  const groupId = location.state;
  const uid = localStorage.getItem("uid");
  const [report, setReport] = useState();
  const navigate = useNavigate();

  const BackButton = () => {
    console.log("ajef;haiou");
    navigate("/main");
  };
  useEffect(() => {
    getReportInfo(uid, groupId).then((data) => {
      setReport(data);
    });
  }, []);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <h2>レポート一覧</h2>
        <Button onClick={() => BackButton()} sx={{ marginLeft: "auto" }}>
          戻る
        </Button>
      </div>
      {report &&
        report.map((conducts) => {
          // let year = conducts.date.toDate().getFullYear();
          // let month = conducts.date.toDate().getMonth() + 1;
          // let day = conducts.date.toDate().getDate();
          // let dayofweek = conducts.date.toDate().getDay();
          // let hour = conducts.date.toDate().getHours();
          // let minute = conducts.date.toDate().getMinutes();
          let fnsH = format(conducts.date.toDate(), "yyyy年M月d日(E) HH:mm", {
            locale: ja,
          });
          return (
            <Accordion key={conducts.date}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{fnsH}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <h3>今日やったこと</h3>
                <Typography>{conducts.conduct}</Typography>
                <h3>次回やること</h3>
                <Typography>{conducts.plan}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
}

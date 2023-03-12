import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { updateReport } from "../../api/report/addKeepReport";
import { getEditReportInfo } from "../../api/report/getReportInfo";
import { getReportInfo } from "../../api/report/getReportInfo";

export default function EditReport(props) {
  const {
    handleCloseEditReport,
    editReportOpen,
    reportDate,
    groupId,
    editCheck,
    setReport,
  } = props;
  const [conduct, setConduct] = useState("");
  const [plan, setPlan] = useState("");
  const uid = localStorage.getItem("uid");

  const keepReport = async (conduct, plan) => {
    if (conduct === "" && plan === "") {
      alert("どちらかを入力してください");
    } else {
      handleCloseEditReport();
      await updateReport(conduct, plan, groupId, reportDate);
      getReportInfo(uid, groupId).then((data) => {
        setReport(data);
      });
      // setConduct("");
      // setPlan("");
    }
  };



  useEffect(() => {
    getEditReportInfo(uid, groupId, reportDate).then((data) => {
      setConduct(data.conduct);
      setPlan(data.plan);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editCheck]);

  return (
    <Dialog
      onClose={handleCloseEditReport}
      open={editReportOpen}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "1000px", // Set your width here
          },
        },
      }}
    >
      <div style={{ display: "flex" }}>
        <TextField
          id="filled-password-input"
          label="今日やったこと・今日の気づき"
          // type="password"
          autoComplete="current-password"
          variant="filled"
          multiline
          rows={10}
          sx={{ width: "500px", margin: "50px" }}
          value={conduct}
          onChange={(e) => setConduct(e.target.value)}
        />

        <TextField
          id="filled-password-input"
          label="次回やること"
          // type="password"
          autoComplete="current-password"
          variant="filled"
          multiline
          rows={10}
          sx={{ width: "500px", margin: "50px" }}
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        />
      </div>
      <Button onClick={() => keepReport(conduct, plan)} variant="contained">
        編集完了
      </Button>
    </Dialog>
  );
}

// EditReport.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   editReportOpen: PropTypes.bool.isRequired,
// };

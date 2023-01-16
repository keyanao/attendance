import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { updateRport } from "../../api/addKeepReport";
import { getEditReportInfo } from "../../api/getReportInfo";
import { getReportInfo } from "../../api/getReportInfo";

export default function EditReport(props) {
  const {
    onClose,
    editReportValue,
    editReportOpen,
    date,
    groupId,
    edidCheck,
    setReport,
  } = props;
  const [conduct, setConduct] = useState("");
  const [plan, setPlan] = useState("");
  const uid = localStorage.getItem("uid");

  function keepReport(conduct, plan) {
    if (conduct === "" && plan === "") {
      alert("どちらかを入力してください");
    } else {
      updateRport(conduct, plan, groupId, date).then(() => {
        getReportInfo(uid, groupId).then((data) => {
          setReport(data);
        });
      });
      setConduct("");
      setPlan("");
      onClose(editReportValue);
    }
  }

  const handleClose = () => {
    onClose(editReportValue);
  };

  useEffect(() => {
    getEditReportInfo(uid, groupId, date).then((data) => {
      setConduct(data.conduct);
      setPlan(data.plan);
    });
  }, [edidCheck]);

  return (
    <Dialog
      onClose={handleClose}
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
        編集
      </Button>
    </Dialog>
  );
}

EditReport.propTypes = {
  onClose: PropTypes.func.isRequired,
  editReportOpen: PropTypes.bool.isRequired,
  editReportValue: PropTypes.string.isRequired,
};

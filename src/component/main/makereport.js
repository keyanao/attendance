import React, { useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { addKeepReport } from "../../api/addKeepReport";
import { notify } from "../../pages/main";



export default function MakeReport(props) {
  const { onClose, selectedReportValue, makeReportOpen, groupId } = props;
  const [conduct, setConduct] = useState("");
  const [plan, setPlan] = useState("");

  function keepReport(conduct, plan) {
    console.log(conduct);
    if (conduct === "" && plan === "") {
      alert("どちらかを入力してください");
    } else {
      notify()
      addKeepReport(conduct, plan, groupId);
      setConduct("");
      setPlan("");
      onClose(selectedReportValue);
      props.setIsToast(true)
    }
  }

  const handleClose = () => {
    onClose(selectedReportValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={makeReportOpen}
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
        作成
      </Button>
    </Dialog>
  );
}

MakeReport.propTypes = {
  onClose: PropTypes.func.isRequired,
  makeReportOpen: PropTypes.bool.isRequired,
  selectedReportValue: PropTypes.string.isRequired,
};

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { addKeepReport } from "../../api/addKeepReport";

export default function MakeReport(props) {
  const { onClose, selectedValue, open, groupId } = props;
  const [conduct, setConduct] = useState("");
  const [plan, setPlan] = useState("");

  function keepReport(conduct, plan) {
    addKeepReport(conduct, plan, groupId);
    setConduct("");
    setPlan("");
    onClose(selectedValue);
  }

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
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
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

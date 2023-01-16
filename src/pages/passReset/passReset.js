import "../../style/make.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { sendPassReset } from "../../api/auth/usePassReset";

export default function PassReset() {
  const [resetMail, setResetMail] = useState("");
  const navigate = useNavigate();

  const send = (mail) => {
    sendPassReset(mail, navigate);
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          height: "45vh",
          width: "295px",
          m: "20px auto",
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start" //多分、デフォルトflex-startなので省略できる。
          alignItems="center"
        >
          <Avatar sx={{ bgcolor: teal[400] }}></Avatar>
          <Typography variant={"h5"} sx={{ m: "30px" }}>
            パスワードの初期化
          </Typography>
          <p
            style={{
              opacity: "0.5",
              fontSize: "small",
            }}
          >
            パスワードを変更したいメールアドレスを<br></br>入力してください
          </p>
        </Grid>
        <TextField
          label="mail"
          fullWidth
          required
          onChange={(e) => setResetMail(e.target.value)}
          sx={{ marginTop: 1, background: "rgb(245,245,245)" }}
        />
        <Box mt={3}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={() => send(resetMail)}
            fullWidth
          >
            送信
          </Button>
        </Box>
      </Paper>
    </>
  );
}

import "../../style/make.css";
import React, { useState } from "react";
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
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function SettingPass() {
  const [newPassword, setNewPassword] = useState("");
  const [value, setValue] = useState(false);

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
            新しいパスワードを入力してください
          </p>
        </Grid>
        <TextField
          label={value ? "" : "password"}
          type={value ? "text" : "password"}
          fullWidth
          required
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ marginTop: 1, background: "rgb(245,245,245)" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setValue(!value)}
                  edge="end"
                >
                  {value ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box mt={3}>
          <Button type="submit" color="primary" variant="contained" fullWidth>
            送信
          </Button>
        </Box>
      </Paper>
    </>
  );
}

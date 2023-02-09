import "../../style/make.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import React, { useState, useEffect } from "react";
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
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import teal from "@mui/material/colors/teal";
import { createUser } from "../../api/auth/createUser";

const Make = () => {
  const navigation = useNavigate();
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerMail, setRegisterMail] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  // const auth = getAuth();
  const [value, setValue] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      localStorage.setItem("uid", auth.currentUser.uid);
    });
  }, []);

  return (
    <>
      {user ? (
        navigation("/dialogMenu")
      ) : (
        <>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              height: "70vh",
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
                New Aaccount
              </Typography>
            </Grid>
            <TextField
              label="fullname"
              fullWidth
              required
              onChange={(e) => setName(e.target.value)}
              sx={{ marginTop: 1, background: "rgb(245,245,245)" }}
            />
            <TextField
              label="mail"
              fullWidth
              required
              onChange={(e) => setRegisterMail(e.target.value)}
              sx={{ marginTop: 1, background: "rgb(245,245,245)" }}
            />
            <TextField
              label={value ? "" : "password"}
              type={value ? "text" : "password"}
              fullWidth
              required
              onChange={(e) => setRegisterPassword(e.target.value)}
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
            <div className="pass">
              <p>passwordは英数字6文字以上で入力してください</p>
            </div>
            {/* ラベルとチェックボックス */}
            <Box mt={3}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                onClick={() => createUser(name, registerMail, registerPassword)}
              >
                新規作成
              </Button>
            </Box>
          </Paper>
        </>
      )}
    </>
  );
};

export default Make;

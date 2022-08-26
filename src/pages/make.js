import './make.css';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import React, { useState, useEffect } from 'react';
import { Navigate,  Route, Routes} from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography
} from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { onAuthStateChenged, signOut } from "firebase/auth";
import { teal } from "@mui/material/colors";
const Make = () => {
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerMail, setRegisterMail] = useState("")
  const [user, setUser] = useState("");//ユーザ

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerMail,
        registerPassword
      );
    } catch(error) {
      alert("正しく入力してください");
    }
  };
   useEffect(() => {
     onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
   }, []);
  
  return (
    <>
      {user ? (
        <Navigate to={`/success`} />
        ):(
          <>
          <form onSubmit={handleSubmit}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: "70vh",
                width: "280px",
                m: "20px auto"
              }}
            >
              <Grid
                container
                direction="column"
                justifyContent="flex-start" //多分、デフォルトflex-startなので省略できる。
                alignItems="center"
              >
                <Avatar sx={{ bgcolor: teal[400] }}>
                </Avatar>
                <Typography variant={"h5"} sx={{ m: "30px" }}>
                  New Aaccount
                </Typography>
              </Grid>
              <TextField label="mail" fullWidth required onChange={(e) => setRegisterMail(e.target.value)} />
              <TextField
                label="Password"
                fullWidth
                required
                onChange={(e) => setRegisterPassword(e.target.value)}
                sx={{marginTop: 1 }}
              />
               <p>passwordは英数字6文字以上で入力してください</p>
          
              {/* ラベルとチェックボックス */}
              <Box mt={3}>
                <Button type="submit" color="primary" variant="contained" fullWidth>
                  新規作成
                </Button>
              </Box>
            </Paper>
          </form>
        </>
        )}
    </>
  );
};

export default Make;
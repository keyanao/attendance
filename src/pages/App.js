import './App.css';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Main from './main';//本画面
import Make from './make';//新規登録画面
import Success from './success';//新規登録画面
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import { useNavigate, Navigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "./FirebaseConfig.js";


function Login(props) {
  const [loginPassword, setLoginPassword] = useState("")
  const [loginMail, setLoginMail] = useState("")
  const [user, setUser] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(
        auth,
        loginMail,
        loginPassword
      );
    } catch(error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  }
  // const navigate = useNavigate();

  // // function handleClick(path) {
  // //   navigate(path);
  // // }
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>lab stay</h1>
        <form onSubmit={handleSubmit}>
          <div class="mail">
            <TextField type="text"  label="mail" onChange={(e) => setLoginMail(e.target.value)} />
          </div> 
          <div class="pass">
            <TextField type="text"  label="password" onChange={(e) => setLoginPassword(e.target.value)} sx={{ marginTop: 1}} />
          </div>
          <Button type="submit" variant="outlined" sx={{ color: "black", marginTop: 1 }}>ログイン</Button>
        </form>
        <Link to="make">会員登録がまだな方はこちらへ</Link>
      </header>
    </div>
  )
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={< Login />}/>
        <Route path="main" element={< Main />}/>
        <Route path="make" element={< Make />} />
        <Route path="success" element={< Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

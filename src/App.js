import "./style/App.css";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Make from "./pages/make/make";
import DialogMenu from "./pages/dialogmenu/dialog";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import Main from "./pages/main/main";
import Report from "./pages/report/report";
import PassReset from "./pages/passReset/passReset"
import SettingPass from "./pages/passReset/settingPass";

function Login() {
  const [loginPassword, setLoginPassword] = useState("");
  const [loginMail, setLoginMail] = useState("");
  const [user, setUser] = useState();
  const [value, setValue] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginMail, loginPassword);
    } catch (error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      localStorage.setItem("uid", auth.currentUser.uid);
    });
  }, []);

  return (
    <>
      {user ? (
        <Navigate to={"/main"} />
      ) : (
        <div className="App" style={{ width: "100%" }}>
          <header className="App-header">
            <div className="context">
              <h1>Lab Stay</h1>
            </div>
            <div className="inputline">
              <h2 style={{ margin: "0" }}>ログイン</h2>
              <form onSubmit={handleSubmit}>
                <div className="mail">
                  <TextField
                    type="text"
                    label="mail"
                    inputProps={{
                      style: { width: "270px", background: "rgb(245,245,245)" },
                    }}
                    onChange={(e) => setLoginMail(e.target.value)}
                  />
                </div>
                <div className="password">
                  <TextField
                    label={value ? "" : "Password"}
                    type={value ? "text" : "password"}
                    fullWidth
                    required
                    onChange={(e) => setLoginPassword(e.target.value)}
                    sx={{
                      marginTop: 1,
                      width: "300px",
                      background: "rgb(245,245,245)",
                    }}
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
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginTop: 1, width: "300px" }}
                >
                  ログイン
                </Button>
              </form>
              <div>
                <Link className="linkline" to="make">
                  会員登録がまだの方はこちらへ
                </Link>
              </div>
              <div style={{ fontSize: "20px" }}>
                <Link className="linkline" to="passReset">
                  パスワードを忘れた方
                </Link>
              </div>
            </div>
          </header>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="make" element={<Make />} />
        <Route path="main" element={<Main />} />
        <Route path="dialogMenu" element={<DialogMenu />} />
        <Route path="report" element={<Report />} />
        <Route path="passReset" element={<PassReset />} />
        <Route path="settingPass" element={<SettingPass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

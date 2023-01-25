import { useEffect, useState } from "react";
// import "./stopwatch.css";

export const TimeView = (props) => {
  const [displayTime, setDisplayTime] = useState("00:00:00");
  const [calcTime, setcalcTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (props.isAttended === true) {
      const localStorageCheck = localStorage.getItem("start");
      if (!localStorageCheck) {
        const start = Date.now();
        localStorage.setItem("start", start);
      }
      setRunning(true);
    } else if (props.isAttended === false) {
      localStorage.removeItem("start");
      setRunning(false);
      setDisplayTime("00:00:00");
      setcalcTime(0);
    }
  }, [props.isAttended]);

  // ボタンをクリックした時の処理
  useEffect(() => {
    let timerInterval = undefined;
    // タイマーが動いている場合
    if (running) {
      timerInterval = window.setInterval(() => {
        const startTime = localStorage.getItem("start");
        const calc = Date.now() - startTime;
        setcalcTime(calc);
        //ミリ秒表示の場合、10
        // 秒表示の場合 1000
      }, 1000);
    }
    // クリーンアップ（タイマーをクリア）
    return () => {
      window.clearInterval(timerInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  // タイムスタンプを変換
  useEffect(() => {
    const currentTime = new Date(calcTime);
    const h = String(currentTime.getHours() - 9).padStart(2, "0");
    const m = String(currentTime.getMinutes()).padStart(2, "0");
    const s = String(currentTime.getSeconds()).padStart(2, "0");
    setDisplayTime(`${h}:${m}:${s}`);
  }, [calcTime]);

  return (
    <div className="App">
      <time>{displayTime}</time>
    </div>
  );
};

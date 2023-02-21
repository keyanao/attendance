import React from "react";
import main from "../../image/main.jpg";
import report from "../../image/report.jpg";
import "../../style/description.css";


export default function Description() {
  return (
    <>
      <p className="title">Lab Stay</p>
      <div className="des">
        <p>・出席管理、時間管理で研究室への出席率を向上</p>
        <img src={main} alt="main画面" width={"60%"}></img>
        <p>・レポート投稿機能で今日したこと、次回することを管理</p>
        <img src={report} alt="レポート画面" width={"60%"}></img>
      </div>
    </>
  );
}

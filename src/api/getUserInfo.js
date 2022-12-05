import React, { useEffect, useState, useRef } from "react";
import {
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db, auth } from "../FirebaseConfig";



export const getUserInfo = async (uid) => {
  let gId;
  let data = [];

  const docRef = doc(db, "userInfo", uid);
  const docSnap = await getDoc(docRef);
  // console.log(docSnap.data());
  if (docSnap.exists()) {
    gId = docSnap.data().groupId;
  } else {
    console.log("No such document!");
  }

  const q = query(collection(db, "userInfo"), where("groupId", "==", gId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async function (doc) {
    let dataReport;
    let dataMonthTime;
    let dataWeekTime;
    //レポート数
    const qReport = query(
      collection(db, "userInfo", doc.id, "report"),
      orderBy("timestamp", "desc"),
      limit(1)
    );
    const querySnapshotReport = await getDocs(qReport);
    querySnapshotReport.forEach((doc) => {
      dataReport = doc.data().report;
    });

    // console.log("dataReport", dataReport);

    //月の出席時間
    const qMonthTime = query(
      collection(db, "userInfo", doc.id, "monthTime"),
      // where("groupId", "==", gId),
      orderBy("timestamp", "asc"),
      limit(1)
    );
    const querySnapshotMonthTime = await getDocs(qMonthTime);
    querySnapshotMonthTime.forEach((doc) => {
      dataMonthTime = doc.data().time;
    });

    //週の出席時間
    const qWeekTime = query(
      collection(db, "userInfo", doc.id, "weekTime"),
      // where("groupId", "==", gId),
      orderBy("timestamp", "asc"),
      limit(1)
    );
    const querySnapshotWeekTime = await getDocs(qWeekTime);
    querySnapshotWeekTime.forEach((doc) => {
      dataWeekTime = doc.data().time;
    });

    const example = {
      id: doc.id,
      name: doc.data().name,
      attend: doc.data().attend,
      report: dataReport,
      monthTime: dataMonthTime,
      weekTime: dataWeekTime,
    };
    data.push(example);
  });
  return data;
  // console.log(data);

  // data.forEach(async function (val) {
  //   //全レポート数取得
  //   const qReport = query(
  //     collection(db, "userInfo", val.id, "report"),
  //     orderBy("timestamp", "desc"),
  //     limit(1)
  //   );
  //   const querySnapshotReport = await getDocs(qReport);
  //   querySnapshotReport.forEach((doc) => {
  //     data.push({ MonthTime: doc.data().report });
  //   });
  //   // console.log(dataReport);

  //   //月の時間取得
  //   const qMonthTime = query(
  //     collection(db, "userInfo", val.id, "monthTime"),
  //     // where("groupId", "==", gId),
  //     orderBy("timestamp", "asc"),
  //     limit(1)
  //   );
  //   const querySnapshotMonthTime = await getDocs(qMonthTime);
  //   querySnapshotMonthTime.forEach((doc) => {
  //     data.push(doc.data().time);
  //   });
  //   // console.log(dataMonthTime);

  //   //週の時間取得
  //   const qWeekTime = query(
  //     collection(db, "userInfo", val.id, "weekTime"),
  //     // where("groupId", "==", gId),a
  //     orderBy("timestamp", "asc"),
  //     limit(1)
  //   );
  //   const querySnapshotWeekTime = await getDocs(qWeekTime);
  //   querySnapshotWeekTime.forEach((doc) => {
  //     data.push(doc.data().time);
  //   });
  // });
  // // console.log(data, dataReport, dataMonthTime, dataWeekTime);
  // return { data, dataReport, dataMonthTime, dataWeekTime };
};

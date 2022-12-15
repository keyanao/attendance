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

export const getUserInfo = async (uid, setIsLoading) => {
  let gId;
  const data = [];
  const me = [];

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

  return new Promise((resolve, reject) => {
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
      if (!(example.id === uid)) {
        data.push(example);
      } else {
        data.unshift(example);
      }
      // if (data.length + 1 === querySnapshot.size) {
      if (data.length === querySnapshot.size) {
        setIsLoading(true);
        resolve(data);
      }
    });
  });
};

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
import { db } from "../FirebaseConfig";

export const getMyInfo = async (uid, setIsLoading) => {
  const data = [];
  const docRef = doc(db, "userInfo", uid);
  const docSnap = await getDoc(docRef);

  return new Promise(async (resolve, reject) => {
    let dataMonthTime;
    let dataWeekTime;

    //月の出席時間
    const qMonthTime = query(
      collection(db, "userInfo", uid, "monthTime"),
      orderBy("timestamp", "asc"),
      limit(1)
    );
    const querySnapshotMonthTime = await getDocs(qMonthTime);
    querySnapshotMonthTime.forEach((doc) => {
      dataMonthTime = doc.data().time;
    });

    //週の出席時間
    const qWeekTime = query(
      collection(db, "userInfo", uid, "weekTime"),
      orderBy("timestamp", "asc"),
      limit(1)
    );
    const querySnapshotWeekTime = await getDocs(qWeekTime);
    querySnapshotWeekTime.forEach((doc) => {
      dataWeekTime = doc.data().time;
    });

    const example = {
      id: uid,
      name: docSnap.data().name,
      attend: docSnap.data().attend,
      report: doc.data().report,
      monthTime: dataMonthTime,
      weekTime: dataWeekTime,
    };
    if (example.id === uid) {
      data.push(example);
      setIsLoading(true);
      resolve(data);
    }
  });
};

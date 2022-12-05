import React, { useEffect, useState, useRef } from "react";
import {
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
// import { db, auth } from "../../FirebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { async } from "@firebase/util";

export const monthTime = async () => {
  let d = new Date();
  const month = d.getMonth() + 1; //何月かを取得
  return month;
};

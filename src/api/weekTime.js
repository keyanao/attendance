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

export const weekTime = async () => {
  const time = Date.now(); //unixtime
  const newTime = (time - 259200) / 604800 / 1000;
  return newTime; //1970年1月4日(月曜日)から今日が何週目かわかる
};

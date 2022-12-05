import React, { useEffect, useState, useRef } from "react";
import {
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../../FirebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { async } from "@firebase/util";

export const getId = async (uid) => {
  let gId;
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
  const data = querySnapshot.docs.map((doc) => ({
    // groupId: doc.data().groupId,
    name: doc.data().name,
    registerMail: doc.data().registerMail,
    id: doc.id,
  }));
  return gId;
};

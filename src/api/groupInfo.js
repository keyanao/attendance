import React, { useEffect, useState, useRef } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export const getGroupInfo = async (uid) => {
  let id;
  let groupName;
  let lat;
  let lng;
  const docRef = doc(db, "userInfo", uid);
  const docSnap = await getDoc(docRef);
  // console.log(docSnap.data());
  if (docSnap.exists()) {
    id = docSnap.data().groupId;
  } else {
    console.log("No such document!");
  }

  const docRefName = doc(db, "groupInfo", id);
  const docSnapName = await getDoc(docRefName);
  // console.log(docSnap.data());
  if (docSnap.exists()) {
    groupName = docSnapName.data().groupname;
    lat = docSnapName.data().lat;
    lng = docSnapName.data().lng;
    return { groupName: groupName, id: id, lat: lat, lng: lng };
  } else {
    console.log("No such document!");
  }
};

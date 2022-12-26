import React, { useState } from "react";
import {
  query,
  where,
  getDocs,
  addDoc,
  collection,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../FirebaseConfig";

export const addAddres = async (groupname, lat, lng, uid, navigation) => {
  try {
    await addDoc(collection(db, "groupInfo"), {
      //オブジェクトにしてデータベースに送る
      groupname: groupname,
      lat: lat,
      lng: lng,
    });
  } catch (error) {
    alert("住所を入力してください");
  }

  try {
    const q = query(
      collection(db, "groupInfo"),
      where("groupname", "==", groupname),
      where("lat", "==", lat),
      where("lng", "==", lng)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc1) => {
      updateDoc(doc(db, "userInfo", uid), {
        //オブジェクトにしてデータベースに送る
        groupId: doc1.id,
      });
    });
    navigation("/main");
  } catch (error) {
    alert(error);
  }
};

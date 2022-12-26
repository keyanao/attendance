import {
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  updateDoc,
  orderBy,
  limit,
  addDoc,
} from "firebase/firestore";
import { db } from "../FirebaseConfig";

export const addKeepReport = async (conduct, plan, groupId) => {
  try {
    const uid = localStorage.getItem("uid");
    const docRef = doc(db, "userInfo", uid);
    const docSnap = await getDoc(docRef);
      updateDoc(docRef, {
        report: docSnap.data().report + 1,
      });
    await addDoc(collection(db, "groupInfo", groupId, "reportInfo"), {
      uid: uid,
      conduct: conduct,
      plan: plan,
      date: new Date(),
    });
  } catch (error) {
    console.log(error);
  }
};

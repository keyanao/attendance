import {
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  updateDoc,
  where,
  addDoc,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";

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

export const updateRport = async (conduct, plan, groupId, date) => {
  const uid = localStorage.getItem("uid");

  const qReport = query(
    collection(db, "groupInfo", groupId, "reportInfo"),
    where("uid", "==", uid),
    where("date", "==", date)
  );
  const querySnapshotReport = await getDocs(qReport);
  querySnapshotReport.forEach((doc1) => {
    const id = doc1.id;
    updateDoc(doc(db, "groupInfo", groupId, "reportInfo", id), {
      conduct: conduct,
      plan: plan,
    });
  });
};

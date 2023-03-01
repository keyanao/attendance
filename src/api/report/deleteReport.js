import {
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";

export const deleteReport = async (uid, groupId, date) => {
  console.log(date);

  const qReport = query(
    collection(db, "groupInfo", groupId, "reportInfo"),
    where("uid", "==", uid),
    where("date", "==", date)
  );
  const querySnapshotReport = await getDocs(qReport);
  querySnapshotReport.forEach((doc1) => {
    const id = doc1.id;
    deleteDoc(doc(db, "groupInfo", groupId, "reportInfo", id));
  });

  const reports = doc(db, "userInfo", uid);
  const docSnap = await getDoc(reports);
  console.log(docSnap.data().report);

  await updateDoc(reports, {
    report: docSnap.data().report - 1,
  });
};

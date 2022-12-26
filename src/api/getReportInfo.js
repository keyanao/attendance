import {
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../FirebaseConfig";

export const getReportInfo = async (uid, groupId) => {
  let data = [];

  return new Promise(async (resolve, reject) => {
    const qReport = query(
      collection(db, "groupInfo", groupId, "reportInfo"),
      where("uid", "==", uid),
      orderBy("date", "asc")
    );
    const querySnapshotReport = await getDocs(qReport);
    querySnapshotReport.forEach((doc) => {
      data.push(doc.data());
    });
    resolve(data);
  });
};

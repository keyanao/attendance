import {
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

export const getEditReportInfo = async (uid, groupId, date) => {
  let conduct = "";
  let plan = "";
  console.log(date)

  return new Promise(async (resolve, reject) => {
    const qReport = query(
      collection(db, "groupInfo", groupId, "reportInfo"),
      where("uid", "==", uid),
      where("date", "==", date)
    );
    const querySnapshotReport = await getDocs(qReport);
    querySnapshotReport.forEach((doc) => {
      console.log(doc.id)
      conduct = doc.data().conduct;
      plan = doc.data().plan;
    });
    const reportData = {
      conduct: conduct,
      plan: plan,
    };
    resolve(reportData);
  });
};

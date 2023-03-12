import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

export const getReportInfo = async (uid, groupId) => {
  let data = [];

  const qReport = query(
    collection(db, "groupInfo", groupId, "reportInfo"),
    where("uid", "==", uid),
    orderBy("date", "desc")
  );
  const querySnapshotReport = await getDocs(qReport);
  querySnapshotReport.forEach((doc) => {
    const reportData = {
      id: doc.id,
      conduct: doc.data().conduct,
      date: doc.data().date,
      plan: doc.data().plan,
      uid: doc.data().uid,
    };
    data.push(reportData);
  });
  return data;
};

export const getEditReportInfo = async (uid, groupId, date) => {
  let conduct = "";
  let plan = "";

  const qReport = query(
    collection(db, "groupInfo", groupId, "reportInfo"),
    where("uid", "==", uid),
    where("date", "==", date)
  );

  const querySnapshotReport = await getDocs(qReport);
  querySnapshotReport.forEach((doc) => {
    conduct = doc.data().conduct;
    plan = doc.data().plan;
  });
  const reportData = {
    conduct: conduct,
    plan: plan,
  };
  return reportData;
};

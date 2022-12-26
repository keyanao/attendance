import {
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
} from "firebase/firestore";
import { db } from "../FirebaseConfig";

export const updateAttend = async (uid) => {

  const washingtonRef = doc(db, "userInfo", uid);

  await updateDoc(washingtonRef, {
    attend: true,
  });
};

export const updateAbsebce = async (uid, minute) => {
  const washingtonRef = doc(db, "userInfo", uid);

  await updateDoc(washingtonRef, {
    attend: false,
  });

  const qMonthTime = query(
    collection(db, "userInfo", uid, "monthTime"),
    orderBy("timestamp", "asc"),
    limit(1)
  );
  const querySnapshotMonthTime = await getDocs(qMonthTime);
  querySnapshotMonthTime.forEach((doc1) => {
    const time1 = doc1.data().time + minute; //意味変数
    console.log("month", time1);
    updateDoc(doc(db, "userInfo", uid, "monthTime", doc1.id), {
      time: time1,
    });
  });

  const qWeekTime = query(
    collection(db, "userInfo", uid, "weekTime"),
    orderBy("timestamp", "asc"),
    limit(1)
  );
  const querySnapshotWeekTime = await getDocs(qWeekTime);
  querySnapshotWeekTime.forEach((doc2) => {
    const time = doc2.data().time + minute;
    console.log("week", time);
    updateDoc(doc(db, "userInfo", uid, "weekTime", doc2.id), {
      time: time,
    });
  });
};

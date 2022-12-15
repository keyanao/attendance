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

export const timePlus = async (uid, minute) => {
  const qMonthTime = query(
    collection(db, "userInfo", uid, "monthTime"),
    orderBy("timestamp", "asc"),
    limit(1)
  );
  const querySnapshotMonthTime = await getDocs(qMonthTime);
  querySnapshotMonthTime.forEach((doc) => {
    updateDoc(doc(db, "userInfo", uid, "monthTime",doc.id), {
      time: minute
    })
  })

  const qWeekTime = query(
    collection(db, "userInfo", uid, "weekTime"),
    orderBy("timestamp", "asc"),
    limit(1)
  );
  const querySnapshotWeekTime = await getDocs(qWeekTime);
  querySnapshotWeekTime.forEach((doc) => {
    updateDoc(doc(db, "userInfo", uid, "weekTime",doc.id), {
      time: minute,
    });
  });
};

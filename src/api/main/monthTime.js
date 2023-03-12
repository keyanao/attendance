import {
  addDoc,
  getDocs,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";

export const monthTime = async (uid) => {
  let d = new Date();
  const month = d.getMonth() + 1; //何月かを取得
  let monthTime;

  const qMonthTime = query(
    collection(db, "userInfo", uid, "monthTime"),
    orderBy("timestamp", "desc"),
    limit(1)
  );
  const querySnapshotMonth = await getDocs(qMonthTime);
  querySnapshotMonth.forEach((doc) => {
    monthTime = doc.data().timestamp.toDate().getMonth() + 1;
  });
  console.log("month", month);
  console.log("monthTime", monthTime);
  if (month !== monthTime) {
    await addDoc(collection(db, "userInfo", uid, "monthTime"), {
      time: 0,
      timestamp: new Date(),
    });
  }
};

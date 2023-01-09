import {
  addDoc,
  getDocs,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
// import { db, auth } from "../../FirebaseConfig";
import { db } from "../FirebaseConfig";

export const weekTime = async (uid) => {
  const time = Date.now(); //unixtime
  let weekTime;
  const newTime = Math.floor((time - 259200) / 604800 / 1000);
  //1970年1月4日(月曜日)から今日が何週目かわかる

  const qWeekTime = query(
    collection(db, "userInfo", uid, "weekTime"),
    orderBy("timestamp", "desc"),//最新
    limit(1)
  );
  const querySnapshotMonth = await getDocs(qWeekTime);
  querySnapshotMonth.forEach((doc) => {
    weekTime = doc.data().timestamp;
  });
  if (weekTime !== newTime) {
    await addDoc(collection(db, "userInfo", uid, "weekTime"), {
      time: 0,
      timestamp: Math.floor((time - 259200) / 604800 / 1000),
    });
  }
};

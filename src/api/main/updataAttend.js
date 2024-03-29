import {
  doc,
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";

export const updateAttend = async (uid) => {
  const attend = doc(db, "userInfo", uid);

  await updateDoc(attend, {
    attend: true,
  });
};

export const updateAbsence = async (uid, minute) => {
  const absence = doc(db, "userInfo", uid);
  await updateDoc(absence, {
    attend: false,
  });

  const qMonthTime = query(
    collection(db, "userInfo", uid, "monthTime"),
    orderBy("timestamp", "desc"),
    limit(1)
  );
  const querySnapshotMonthTime = await getDocs(qMonthTime);
  querySnapshotMonthTime.forEach((doc1) => {
    console.log(doc1.data().time);
    const time1 = Math.round((doc1.data().time + minute) * 10) / 10; //意味変数
    console.log(time1);
    updateDoc(doc(db, "userInfo", uid, "monthTime", doc1.id), {
      time: time1,
    });
  });

  const qWeekTime = query(
    collection(db, "userInfo", uid, "weekTime"),
    orderBy("timestamp", "desc"),
    limit(1)
  );

  const querySnapshotWeekTime = await getDocs(qWeekTime);
  querySnapshotWeekTime.forEach((doc2) => {
    console.log(doc2.data());
    const time = Math.round((doc2.data().time + minute) * 10) / 10;
    updateDoc(doc(db, "userInfo", uid, "weekTime", doc2.id), {
      time: time,
    });
  });
};

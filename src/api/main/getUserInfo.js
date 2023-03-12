import {
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";

export const getUserInfo = async (uid, setIsLoading, setIsLoading2) => {
  let gId;
  const data = [];

  const time = Date.now(); //unixtime
  const newTime = Math.floor((time - 259200 * 1000) / 604800 / 1000);

  const d = new Date();
  const month = d.getMonth() + 1; //何月かを取得

  const docRefa = doc(db, "userInfo", uid);
  const docSnap = await getDoc(docRefa);
  if (docSnap.exists()) {
    gId = docSnap.data().groupId;
  } else {
    console.log("No such document!");
  }

  const q = query(collection(db, "userInfo"), where("groupId", "==", gId));
  const querySnapshot = await getDocs(q);

  return new Promise((resolve, reject) => {
    querySnapshot.forEach(async function (doc) {
      let dataMonthTime;
      let dataWeekTime;

      //月の出席時間
      const qMonthTime = query(
        collection(db, "userInfo", doc.id, "monthTime"),
        orderBy("timestamp", "desc"),
        limit(1)
      );
      const querySnapshotMonthTime = await getDocs(qMonthTime);
      querySnapshotMonthTime.forEach((doc) => {
        if (month === doc.data().timestamp.toDate().getMonth() + 1) {
          dataMonthTime = doc.data().time;
        } else {
          dataMonthTime = 0;
        }
      });

      //週の出席時間
      const qWeekTime = query(
        collection(db, "userInfo", doc.id, "weekTime"),
        orderBy("timestamp", "desc"),
        limit(1)
      );
      const querySnapshotWeekTime = await getDocs(qWeekTime);
      querySnapshotWeekTime.forEach((doc) => {
        if (doc.data().timestamp === newTime) {
          dataWeekTime = doc.data().time;
        } else {
          dataWeekTime = 0;
        }
      });

      const example = {
        id: doc.id,
        name: doc.data().name,
        attend: doc.data().attend,
        report: doc.data().report,
        monthTime: dataMonthTime,
        weekTime: dataWeekTime,
      };
      if (!(example.id === uid)) {
        data.push(example);
      } else {
        data.unshift(example);
      }
      if (data.length === querySnapshot.size) {
        if (setIsLoading) {
          setIsLoading(true);
        }
        if (setIsLoading2) {
          setIsLoading2(true);
        }
        resolve(data);
      }
    });
  });
};

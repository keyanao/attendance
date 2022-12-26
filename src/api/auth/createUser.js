import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  setDoc,
  addDoc,
  doc,
  collection,
  limit,
  where,
  query,
  getDocs,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig";

export const createUser = async (name, registerMail, registerPassword) => {
  const time = Date.now(); //unixtime

  //送る
  try {
    await createUserWithEmailAndPassword(auth, registerMail, registerPassword);
  } catch (error) {
    alert("正しく入力してください");
  }

  try {
    await setDoc(doc(db, "userInfo", auth.currentUser.uid), {
      //オブジェクトにしてデータベースに送る
      name: name,
      registerMail: registerMail,
      attend: false,
      report: 0,
    });
  } catch (error) {}
  try {
    await addDoc(
      collection(db, "userInfo", auth.currentUser.uid, "monthTime"),
      {
        time: 0,
        timestamp: new Date(),
      }
    );
  } catch (error) {
    console.log(error);
  }
  try {
    await addDoc(collection(db, "userInfo", auth.currentUser.uid, "weekTime"), {
      time: 0,
      timestamp: Math.floor((time - 259200) / 604800 / 1000),
    });
  } catch (error) {
    console.log(error);
  }
};

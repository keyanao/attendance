import { doc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export const updateAttend = async (uid) => {
  const washingtonRef = doc(db, "userInfo", uid);

  await updateDoc(washingtonRef, {
    attend: true,
  });
};


export const updateAbsebce = async (uid) => {
  const washingtonRef = doc(db, "userInfo", uid);

  await updateDoc(washingtonRef, {
    attend: false,
  });
};

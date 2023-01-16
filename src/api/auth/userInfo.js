import {
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";


export const getId = async (uid) => {
  let gId;
  const docRef = doc(db, "userInfo", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    gId = docSnap.data().groupId;
  } else {
    console.log("No such document!");
  }

  const q = query(collection(db, "userInfo"), where("groupId", "==", gId));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    name: doc.data().name,
    registerMail: doc.data().registerMail,
    id: doc.id,
    report: doc.data().report,
  }));
  return gId;
};

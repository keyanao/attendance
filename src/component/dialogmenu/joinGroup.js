import React, { useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import {
  doc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { useNavigate } from "react-router-dom";

export default function JoinGroup(props) {
  const navigation = useNavigate();
  const { onClose, open, uid } = props;
  const [inputId, setInputId] = useState();

  const join = async () => {
    const querySnapshot = await getDocs(collection(db, "groupInfo"));
    querySnapshot.forEach((doc1) => {
      // doc1.data() is never undefined for query doc1 snapshots
      if (inputId === doc1.id) {
        console.log("inputId", inputId);
        console.log("doc1.id", doc1.id);
        try {
          updateDoc(doc(db, "userInfo", uid), {
            //オブジェクトにしてデータベースに送る
            groupId: doc1.id,
          });
          navigation("/main");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <TextField
        type="text"
        label="ルームID"
        variant="filled"
        value={inputId}
        onChange={(e) => setInputId(e.target.value)}
        inputProps={{
          style: {
            width: "500px",
            height: "40px",
            fontSize: "23px",
            background: "rgb(245,245,245)",
          },
        }}
      />
      <Button variant="contained" onClick={join}>
        Join
      </Button>
    </Dialog>
  );
}

JoinGroup.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // selectedValue: PropTypes.string.isRequired,
};

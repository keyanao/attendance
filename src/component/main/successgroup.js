import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "../../FirebaseConfig";

export default function SuccessGroup(props) {
  return (
    <>
      <p>グループID</p>
    </>
  );
}

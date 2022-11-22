import React from "react";

export default function SuccessGroup(props) {
  console.log(props);

  return (
    <>
      <p>グループID</p>
      <p>{props.groupId}</p>
    </>
  );
}

import "../../style/sidemenu.css";
import * as React from "react";
import JoinGroup from "../../component/dialogmenu/joinGroup";
import MakeGroup from "../../component/dialogmenu/makeGroup";
import GroupsIcon from "@mui/icons-material/Groups";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import "../../style/dialog.css";

export default function DialogMenu() {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  const uid = localStorage.getItem("uid");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleClose1 = (value) => {
    setOpen1(false);
    setSelectedValue(value);
  };

  return (
    <div className="dialog-menu">
      <MakeGroup uid={uid} open={open} onClose={handleClose} />
      <JoinGroup uid={uid} open={open1} onClose={handleClose1} />
      <h1>Lab stay</h1>
      <div class="card">
        <div
          class="groupMakeCards"
          onClick={() => {
            handleClickOpen();
          }}
          role="button"
          tabIndex="0"
        >
          <div class="groupMakeCards__thumb">
            <GroupsIcon />
          </div>
          <h3 class="groupMakeCards__heading">グループ作成</h3>
          <p class="groupMakeCards__text"> </p>
        </div>

        <div
          class="groupJoinCards"
          onClick={() => {
            handleClickOpen1();
          }}
          role="button"
          tabIndex="0"
        >
          <div class="groupJoinCards__thumb">
            <GroupAddIcon />
          </div>
          <h3 class="groupJoinCards__heading">グループ参加</h3>
          <p class="groupJoinCards__text"> </p>
        </div>
      </div>
    </div>
  );
}

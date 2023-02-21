import "../style/sidemenu.css";
import * as React from "react";
import JoinGroup from "../component/dialogmenu/joinGroup";
import MakeGroup from "../component/dialogmenu/makeGroup";
import GroupsIcon from "@mui/icons-material/Groups";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import "../style/dialog.css";

export default function DialogMenu() {
  const [makeGroupOpen, setMakeGroupOpen] = React.useState(false);
  const [joinGroupOpen, setJoinGroupOpen] = React.useState(false);
  const [selecteMakedValue, setSelectedMakeValue] = React.useState("");
  const [selectedJoinValue, setSelectedJoinValue] = React.useState("");
  const uid = localStorage.getItem("uid");

  const handleClickMakeGroupOpen = () => {
    setMakeGroupOpen(true);
  };

  const handleClickJoinGroupOpen = () => {
    setJoinGroupOpen(true);
  };

  const handleClickMakeGroupClose = (value) => {
    setMakeGroupOpen(false);
    setSelectedMakeValue(value);
  };

  const handleClickJoinGroupClose = (value) => {
    setJoinGroupOpen(false);
    setSelectedJoinValue(value);
  };

  return (
    <div className="dialog-menu">
      <MakeGroup
        uid={uid}
        open={makeGroupOpen}
        onClose={handleClickMakeGroupClose}
        selecteMakedValue={selecteMakedValue}
      />
      <JoinGroup
        uid={uid}
        open={joinGroupOpen}
        onClose={handleClickJoinGroupClose}
        selectedJoinValue={selectedJoinValue}
      />
      <p class="LabStay">Lab stay</p>
      <div class="card">
        <div
          class="groupMakeCards"
          onClick={() => {
            handleClickMakeGroupOpen();
          }}
          role="button"
          tabIndex="0"
        >
          <div class="groupMakeCards__thumb">
            <GroupsIcon />
          </div>
          <h3 class="groupMakeCards__heading">グループ作成</h3>
          <p class="groupMakeCards__text">
            位置情報,グループ名を決めて<br></br>新しいグループを作成します
          </p>
        </div>

        <div
          class="groupJoinCards"
          onClick={() => {
            handleClickJoinGroupOpen();
          }}
          role="button"
          tabIndex="0"
        >
          <div class="groupJoinCards__thumb">
            <GroupAddIcon />
          </div>
          <h3 class="groupJoinCards__heading">グループ参加</h3>
          <p class="groupJoinCards__text">
            既存のグループに参加します<br></br>参加にはグループIDが必要です
          </p>
        </div>
      </div>
    </div>
  );
}

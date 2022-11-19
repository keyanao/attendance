import React, { useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import "../../style/success.css";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  query,
  where,
  getDocs,
  addDoc,
  collection,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { auth,db } from "../../FirebaseConfig";
import Geocode from "react-geocode";
import { useNavigate } from "react-router-dom";

export default function MakeGroup(props) {
  const { onClose, open, uid } = props;
  const navigation = useNavigate();
  const [isUsedNowLocation, setIsUsedNowLocation] = useState(true);
  const [location, setLocation] = useState();
  const [groupname, setGroupname] = useState();
  let lat = 0;
  let lng = 0;
  let success = false;

  const handleClose = () => {
    setIsUsedNowLocation(true);
    setLocation();
    setGroupname();
    // console.log('selectedValue')
  };

  const nowLocation = () => {
    setIsUsedNowLocation(!isUsedNowLocation);
    setLocation();
  };

  const getCurrentPosition = () =>
    new Promise((resolve, error) => {
      return navigator.geolocation.getCurrentPosition(resolve, error);
    });

  async function checkCurrentPosition() {
    let positions = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return positions;
  }

  async function Geo(location) {
    Geocode.setApiKey("AIzaSyDLWRffGzo5fS6xR01feuCUWniJUM2h6HY");
    return new Promise(function (resolve, reject) {
      Geocode.fromAddress(location).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          resolve([lat, lng]);
        },
        (error) => {
          alert(error);
          reject("Request failed");
        }
      );
    });
  }

  async function CreateGroup(groupname, location) {
    if (groupname) {
      if (isUsedNowLocation === true) {
        //現在地から緯度経度
        const position = await checkCurrentPosition();
        const { latitude, longitude } = position?.coords;
        lat = Math.round(latitude * 1000) / 1000;
        lng = Math.floor(longitude * 1000) / 1000;
      } else {
        //住所から緯度経度
        const position = await Geo(location);
        console.log(position);
        lat = Math.round(position[0] * 1000) / 1000;
        lng = Math.floor(position[1] * 1000) / 1000;
      }
      try {
        //グループ保存
        handleClose();
        success = true;
        console.log(success);
        await addDoc(collection(db, "groupInfo"), {
          //オブジェクトにしてデータベースに送る
          groupname: groupname,
          lat: lat,
          lng: lng,
        });
      } catch (error) {
        alert("住所を入力してください");
      }

      try {
        const q = query(
          collection(db, "groupInfo"),
          where("groupname", "==", groupname),
          where("lat", "==", lat),
          where("lng", "==", lng)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc1) => {
          updateDoc(doc(db, "userInfo", uid), {
            //オブジェクトにしてデータベースに送る
            groupId: doc1.id,
          });
          navigation("/main", { props: doc1.id });
        });
      } catch (error) {
        alert(error);
      }
    } else {
      alert("グループ名を入力してください");
    }
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "295px",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="flex-start" //多分、デフォルトflex-startなので省略できる。
            alignItems="center"
          >
            <Avatar sx={{ bgcolor: teal[400] }}></Avatar>
            <Typography variant={"h5"} sx={{ m: "30px" }}>
              New Group
            </Typography>
          </Grid>
          <TextField
            label="グループ名"
            fullWidth
            required
            sx={{ marginTop: 1, background: "rgb(245,245,245)" }}
            value={groupname}
            onChange={(e) => setGroupname(e.target.value)}
          />
          <TextField
            disabled={isUsedNowLocation}
            label="住所"
            fullWidth
            required
            sx={{ marginTop: 1, background: "rgb(245,245,245)" }}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="現在地を使う"
            onChange={nowLocation}
          />
          {/* ラベルとチェックボックス */}
          <Box mt={3}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              onClose={handleClose}
              onClick={() => CreateGroup(groupname, location)}
            >
              新規作成
            </Button>
          </Box>
        </Paper>
      </>
    </Dialog>
  );
}

MakeGroup.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // selectedValue: PropTypes.string.isRequired,
};

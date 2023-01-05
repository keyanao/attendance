import React, { useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import "../../style/success.css";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Geocode from "react-geocode";
import { useNavigate } from "react-router-dom";
import { addAddres } from "../../api/addAddres";
import GroupsIcon from "@mui/icons-material/Groups";

export default function MakeGroup(props) {
  const { onClose, open, uid } = props;
  const navigation = useNavigate();
  const [isUsedNowLocation, setIsUsedNowLocation] = useState(true);
  const [location, setLocation] = useState();
  const [groupname, setGroupname] = useState();
  let lat = 0;
  let lng = 0;

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
      console.log(uid);
      if (addAddres(groupname, lat, lng, uid, navigation)) {
        handleClose();
        // navigation("/main");
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
            <GroupsIcon />
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

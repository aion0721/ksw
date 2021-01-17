import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Paper,
  Grid,
  Button,
  TextField,
  Card,
  Box,
} from "@material-ui/core";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    paddding: theme.spacing(2),
    color: theme.palette.text.primary,
    margin: theme.spacing(2),
  },
  card: {
    padding: theme.spacing(2),
  },
}));
function Top() {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    register,
    watch,
    getValues,
    setValue,
  } = useForm();
  const watchAllFields = watch();
  const onSubmit = (register) => console.log(register);

  const [confirmFlag, setConfirmFlag] = useState(false);

  function showValue() {
    setConfirmFlag(!confirmFlag);
  }

  function confirmValue() {}

  function getAddress() {
    const pattern = /^\d{7}$/g;
    const zipNumTmp = getValues("zipNum");

    if (!zipNumTmp.match(pattern)) {
      alert("7桁で郵便番号を入力してください。");
      return false;
    }
    console.log(getValues("zipNum"));
    axios
      .get(
        "https://madefor.github.io/postal-code-api/api/v1/" +
          zipNumTmp.substr(0, 3) +
          "/" +
          zipNumTmp.substr(3, 4) +
          ".json"
      )
      .then((results) => {
        const data = results.data.data[0].ja;
        console.log(data);
        const concatAddress =
          data.prefecture +
          data.address1 +
          data.address2 +
          data.address3 +
          data.address4;
        setValue("address1", concatAddress, {
          shouldValidate: true,
          shouldDirty: true,
        });
      });
  }

  return (
    <div>
      <div style={{ display: !confirmFlag ? "block" : "none" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <Grid item sm={4}>
                  AAA
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    inputRef={register}
                    label="姓"
                    name="lastNameJap"
                  ></TextField>
                  <TextField
                    inputRef={register}
                    label="名"
                    name="firstNameJap"
                  ></TextField>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>
                <TextField
                  inputRef={register}
                  label="姓(かな)"
                  name="lastNameJapRuby"
                ></TextField>
                <TextField
                  inputRef={register}
                  label="名(かな)"
                  name="firstNameJapRuby"
                ></TextField>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>
                <TextField
                  inputRef={register}
                  label="姓(ローマ字)"
                  name="lastNameEng"
                ></TextField>
                <TextField
                  inputRef={register}
                  label="名(ローマ字)"
                  name="firstNameEng"
                ></TextField>
              </Paper>
            </Grid>

            <Grid item xs={3}>
              <Paper className={classes.paper}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">性別</FormLabel>
                  <RadioGroup aria-label="gender" name="gender">
                    <FormControlLabel
                      value="female"
                      control={<Radio inputRef={register} />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio inputRef={register} />}
                      label="male"
                    />
                  </RadioGroup>
                </FormControl>
              </Paper>
            </Grid>

            <Paper>
              <TextField
                inputRef={register({
                  required: "error",
                })}
                label="郵便番号"
                name="zipNum"
              ></TextField>
              <Button
                variant="contained"
                color="primary"
                onClick={() => getAddress()}
              >
                GETADDRESS
              </Button>
              <Controller
                name="address1"
                control={control}
                defaultValue=""
                render={({ onChange, value }) => (
                  <TextField label="住所1" onChange={onChange} value={value} />
                )}
              />
              <TextField
                inputRef={register}
                label="住所2"
                name="address2"
              ></TextField>
            </Paper>
            <Paper>
              <TextField
                inputRef={register}
                label="電話番号"
                name="phoneNumber"
              ></TextField>
              <TextField
                inputRef={register}
                label="メールアドレス"
                name="mailaddress"
              ></TextField>
            </Paper>
            <Button
              variant="contained"
              color="primary"
              onClick={() => showValue()}
            >
              確認画面へ
            </Button>
          </Grid>
        </form>
      </div>
      <div style={{ display: confirmFlag ? "block" : "none" }}>
        <form>
          <h1>Confirm</h1>
          {watchAllFields.lastNameJap}
          {watchAllFields.firstNameJap}
          {watchAllFields.lastNameJapRuby}
          {watchAllFields.firstNameJapRuby}
          {watchAllFields.lastNameEn}
          {watchAllFields.firstNameEn}
          {watchAllFields.gender}
          {watchAllFields.address1}
          {watchAllFields.address2}
          {watchAllFields.phoneNumber}
          {watchAllFields.mailaddress}
          <Button type="submit" variant="contained" color="primary">
            Submit!
          </Button>
          <Button onClick={() => showValue()}>編集へ戻る</Button>
        </form>
      </div>
    </div>
  );
}

export default Top;

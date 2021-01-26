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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
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
    textAlign: "center",
  },
  table: {
    border: 1,
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
              </Card>
              <Card className={classes.card}>
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
              </Card>
              <Card className={classes.card}>
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
              </Card>
              <Card className={classes.card}>
                <FormControl component="fieldset">
                  <FormLabel component="whichguest">性別</FormLabel>
                  <RadioGroup aria-label="whichguest" name="whichguest">
                    <FormControlLabel
                      value="koba"
                      control={<Radio inputRef={register} />}
                      label="新郎"
                    />
                    <FormControlLabel
                      value="sato "
                      control={<Radio inputRef={register} />}
                      label="新婦"
                    />
                  </RadioGroup>
                </FormControl>
              </Card>
              <Card className={classes.card}>
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
              </Card>
              <Card className={classes.card}>
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
                    <TextField
                      label="住所1"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                <TextField
                  inputRef={register}
                  label="住所2"
                  name="address2"
                ></TextField>
              </Card>
              <Card className={classes.card}>
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
              </Card>
              <Button
                variant="contained"
                color="primary"
                onClick={() => showValue()}
              >
                確認画面へ
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <div style={{ display: confirmFlag ? "block" : "none" }}>
        <form>
          <h1>Confirm</h1>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" arial-label="confirm">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>NameJap</TableCell>
                  <TableCell>
                    {watchAllFields.lastNameJap}
                    {watchAllFields.firstNameJap}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>NameJapRuby</TableCell>
                  <TableCell>
                    {watchAllFields.lastNameJapRuby}
                    {watchAllFields.firstNameJapRuby}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>NameEn</TableCell>
                  <TableCell>
                    {watchAllFields.lastNameEn}
                    {watchAllFields.firstNameEn}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>gender</TableCell>
                  <TableCell>{watchAllFields.gender}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>whichguest</TableCell>
                  <TableCell>{watchAllFields.whichguest}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>address</TableCell>
                  <TableCell>
                    {watchAllFields.address1}
                    {watchAllFields.address2}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>phone</TableCell>
                  <TableCell>{watchAllFields.phoneNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>mail</TableCell>
                  <TableCell>{watchAllFields.mailaddress}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
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

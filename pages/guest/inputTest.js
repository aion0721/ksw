import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Paper,
  Divider,
  Button,
  TextField,
} from "@material-ui/core";
import axios from "axios";

function Top() {
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
    const zipNumTmp = getValues("zipNum");
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
          <Paper>
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
            <br />
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
            <br />
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

          <Paper>
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
          <Paper>
            <TextField
              inputRef={register}
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
        </form>
      </div>
      <div style={{ display: confirmFlag ? "block" : "none" }}>
        <form>
          <h1>Confirm</h1>
          {watchAllFields.lastNameJap}
          {watchAllFields.firstNameJap}
          {watchAllFields.gender}
          {watchAllFields.address1}
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

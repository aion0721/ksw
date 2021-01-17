import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Divider,
  Button,
  TextField,
} from "@material-ui/core";

function Top() {
  const { control, handleSubmit, register, watch, getValues } = useForm();
  const watchAllFields = watch();
  const onSubmit = (register) => console.log(register);

  const [confirmFlag, setConfirmFlag] = useState(false);

  function showValue() {
    setConfirmFlag(!confirmFlag);
  }

  function confirmValue() {}

  function getAddress() {
    console.log(getValues("zipNum"));
  }

  return (
    <div>
      <div style={{ visibility: confirmFlag ? "hidden" : "" }}>
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
          <br />
          <Divider />
          <Paper>
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
          </Paper>
          <Paper>
            <TextField
              inputRef={register}
              label="住所"
              name="zipNum"
            ></TextField>
            <Button
              variant="contained"
              color="primary"
              onClick={() => getAddress()}
            >
              GETADDRESS
            </Button>
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
      <div style={{ visibility: !confirmFlag ? "hidden" : "" }}>
        <form>
          <h1>Confirm</h1>
          {watchAllFields.lastNameJap}
          {watchAllFields.firstNameJap}
          {watchAllFields.gender}
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

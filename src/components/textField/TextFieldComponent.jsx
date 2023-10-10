import React, { useState } from "react";
import { Grid, InputAdornment, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import COLORS from "../../colors/COLORS";
//css
import "./textField.css";
const TextFieldComponent = ({
  inputName,
  inputType,
  inputValue,
  inputChange,
  inputErrors,
  isRequired,
  disabledProp,
  enableSideIconsOnFields,
  forLoginProp,
  isForEdit,
  isForCreateProduct,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleVisiblity = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const onInputChange = (ev) => {
    inputChange(ev);
  };
  return (
    <Grid item sm={forLoginProp ? 12 : 6} xs={12}>
      <TextField
        type={
          inputType == "password" && !isPasswordVisible ? "password" : "text"
        }
        placeholder={inputName || inputValue}
        error={inputErrors && inputErrors[inputType] ? true : false}
        variant="filled"
        fullWidth
        sx={{
          backgroundColor: disabledProp ? "" : COLORS.BACKGROUND,
          borderRadius: "10px",
          overflow: "hidden",
        }}
        required={isRequired}
        id={inputType}
        label={inputName}
        name={inputType}
        multiline={inputType === "description"}
        autoComplete={inputType}
        value={isForCreateProduct ? undefined : inputValue}
        onChange={onInputChange}
        disabled={disabledProp}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={handleVisiblity}>
              {isForEdit && !disabledProp ? (
                <EditIcon />
              ) : inputType === "password" ? (
                isPasswordVisible ? (
                  <VisibilityIcon className="passwordVisibleEye" />
                ) : (
                  <VisibilityOffIcon className="passwordVisibleEye" />
                )
              ) : inputType === "price" ? (
                <MonetizationOnIcon />
              ) : (
                ""
              )}
            </InputAdornment>
          ),
          startAdornment: (
            <InputAdornment position="start">
              {enableSideIconsOnFields ? (
                inputType === "email" ? (
                  <EmailIcon />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </InputAdornment>
          ),
        }}
        helperText={
          inputErrors &&
          inputErrors[inputType] &&
          inputErrors[inputType].map(
            (item) =>
              item &&
              !item.includes("is not allowed to be empty") && (
                <b key={item + Date.now()}>{item}</b>
              )
          )
        }
      />
    </Grid>
  );
};

TextFieldComponent.defaultProps = {
  disabledProp: false,
  enableSideIconsOnFields: false,
  forLoginProp: false,
  isForEdit: false,
  inputChange: () => {},
  isForCreateProduct: false,
};

export default TextFieldComponent;

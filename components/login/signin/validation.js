import * as Utils from "../../../helpers/utils";


const EMAIL_REGEX = "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$";
const PASSWORD_REGEX =
  "^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[.!@#$%^&*])[^\\s][a-zA-Z0-9.!@#$%^&*][^\\s]{8,16}$";

function validation(inputs) {
  let errors = {};

  if (Utils.isSpace(inputs.email)) {
    errors["email"] = "Email is required";
  } else if (inputs.email && !inputs.email.match(EMAIL_REGEX)) {
    errors["email"] = "Email is invalid";
  }

  if (Utils.isSpace(inputs.password)) {
    errors["password"] = "Password is required";
  } else if (inputs.password && !inputs.password.match(PASSWORD_REGEX)) {
    errors["password"] = "Password is invalid.";
  }

  
  return errors;
}

export default validation;
import * as Utils from "../../../helpers/utils";

const USERNAME_REGEX = "^(?=[a-zA-Z\\s]{2,}$)(?!.*[_.]{2})[^_.].*[^_.]$";
const EMAIL_REGEX = "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$";
const PASSWORD_REGEX =
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[.@$!%*?&])[A-Za-z\\d.@$!%*?&]{8,16}$";

function validate(inputs) {
  let errors = {};

  if (Utils.isSpace(inputs.name)) {
    errors["name"] = "Name is required";
  } else if (inputs.name && !inputs.name.match(USERNAME_REGEX)) {
    errors["name"] = "Name is invalid, use only alphabetical characters";
  }

  if (Utils.isSpace(inputs.lastname)) {
    errors["lastname"] = "Lastname is required";
  } else if (inputs.lastname && !inputs.lastname.match(USERNAME_REGEX)) {
    errors["lastname"] =
      "Lastname is invalid, use only alphabetical characters";
  }

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

  if (
    Utils.isSpace(inputs.confirmPassword) ||
    inputs.confirmPassword !== inputs.password
  ) {
    errors["confirmPassword"] = "Password does not match";
  }

  return errors;
}

export default validate;

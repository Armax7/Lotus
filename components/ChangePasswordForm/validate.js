import * as Utils from "../../helpers/utils";

const PASSWORD_REGEX =
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[.@$!%*?&])[A-Za-z\\d.@$!%*?&]{8,16}$";

function validate(inputs) {
  let errors = {};

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

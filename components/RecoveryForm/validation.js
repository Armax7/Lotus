import * as Utils from "../../helpers/utils";

const EMAIL_REGEX = "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$";

function validation(inputs) {
  let errors = {};

  if (Utils.isSpace(inputs.email)) {
    errors["email"] = "Email is required";
  } else if (inputs.email && !inputs.email.match(EMAIL_REGEX)) {
    errors["email"] = "Email is invalid";
  }

  return errors;
}

export default validation;

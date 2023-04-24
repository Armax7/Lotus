import * as Utils from "../../helpers/utils";

function validate(inputs) {
  let errors = {};

  if (Utils.isSpace(inputs.name)) {
    errors["name"] = "Name is required";
  }

  return errors;
}

export default validate;

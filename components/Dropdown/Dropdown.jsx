import * as Chakra from "@chakra-ui/react";
import * as Utils from "../../helpers/utils";

function Dropdown({
  options,
  onChange: onChangeProp = () => {},
  placeholder = "Seleccionar opción...",
  bgColor: bgColorProp = "white",
  ...props
}) {
  if (!Array.isArray(options)) {
    throw new TypeError("Error: options should be an array");
  }

  return (
    <Chakra.Select
      onChange={onChangeProp}
      placeholder={placeholder}
      bgColor={bgColorProp}
      {...props}
    >
      {options.map((elem, index) => {
        if (Utils.isObject(elem)) {
          return (
            <option key={index} value={elem.value || elem.id}>
              {elem.label || elem.name}
            </option>
          );
        }
        return (
          <option key={index} value={`option${index}`}>
            {elem}
          </option>
        );
      })}
    </Chakra.Select>
  );
}

export default Dropdown;

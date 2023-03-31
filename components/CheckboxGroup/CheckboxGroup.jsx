import * as Chakra from "@chakra-ui/react";
import * as Utils from "../../helpers/utils";

function CheckboxGroup({
  options = ["option 1", "option 2", "option 3"],
  defaultValue: defaultValueProp = [],
  isDisabled: isDisabledProp = false,
  onChange: onChangeProp = () => {},
  className: classNameProp,
  spacingColumn = 1,
  spacingRow = 5,
  ...props
}) {
  return (
    <Chakra.CheckboxGroup
      defaultValue={defaultValueProp}
      isDisabled={isDisabledProp}
      onChange={onChangeProp}
      className={classNameProp}
      {...props}
    >
      <Chakra.Stack
        spacing={[spacingColumn, spacingRow]}
        direction={["column", "row"]}
      >
        {options.map((elem, index) => {
          let option = elem;
          if (Utils.isObject(elem)) {
            option = elem.name ?? elem.label;
          }
          return (
            <Chakra.Checkbox
              key={index}
              value={option.toString().toLowerCase()}
            >
              {option.toString()}
            </Chakra.Checkbox>
          );
        })}
      </Chakra.Stack>
    </Chakra.CheckboxGroup>
  );
}

export default CheckboxGroup;

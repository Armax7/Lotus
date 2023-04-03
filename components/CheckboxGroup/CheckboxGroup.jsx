import * as Chakra from "@chakra-ui/react";
import * as Utils from "../../helpers/utils";

function CheckboxGroup({
  options = ["option 1", "option 2", "option 3"],
  defaultValue: defaultValueProp = [],
  isDisabled: isDisabledProp = false,
  onChange: onChangeProp = () => {},
  className: classNameProp,
  colorScheme = null,
  maxColumns = 8,
  minColumns = 4,
  spacingColumn = "1rem",
  spacingRow = "1rem",
  ...props
}) {
  return (
    <Chakra.CheckboxGroup
      defaultValue={defaultValueProp}
      isDisabled={isDisabledProp}
      onChange={onChangeProp}
      className={classNameProp}
      colorScheme={colorScheme}
    >
      <Chakra.SimpleGrid
        spacing={[spacingColumn, spacingRow]}
        columns={[minColumns, null, maxColumns]}
        {...props}
      >
        {options.map((elem, index) => {
          let optionId = index;
          let optionName = elem;
          if (Utils.isObject(elem)) {
            optionId = elem.id;
            optionName = elem.name ?? elem.label;
          }
          return (
            <Chakra.Checkbox
              key={index}
              value={optionId.toString().toLowerCase()}
              borderColor={colorScheme}
            >
              {optionName.toString()}
            </Chakra.Checkbox>
          );
        })}
      </Chakra.SimpleGrid>
    </Chakra.CheckboxGroup>
  );
}

export default CheckboxGroup;

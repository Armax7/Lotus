import * as Chakra from "@chakra-ui/react";
import * as Utils from "../../helpers/utils";
import { largeTextHandler } from "../../helpers/utils";
import style from "./ChackboxGroup.module.css"

function CheckboxGroup({
  options = ["option 1", "option 2", "option 3"],
  defaultValue: defaultValueProp = [],
  isDisabled: isDisabledProp = false,
  onChange: onChangeProp = () => {},
  className: classNameProp,
  colorScheme = null,
  maxColumns = 5,
  minColumns = 1,
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
      <div className={style.containerGrid}>
        {options.map((elem, index) => {
          let optionId = index;
          let optionName = elem;
          if (Utils.isObject(elem)) {
            optionId = elem.id;
            optionName = elem.name ?? elem.label;
          }
          return (
            <Chakra.Checkbox
            maxW={"max-content"}
              color="var(--black)"
              bg="var(--color3)"
              borderRadius="100px"
              padding="10px"
              margin="8px 12px"
              key={index}
              value={optionId.toString().toLowerCase()}
              borderColor="var(--color1)"
              transition="transform .2s"
              _hover={{ transform: "translateY(-2px)" }}
              fontFamily={"Poppins"}
            >
              {optionName.toString()}
            </Chakra.Checkbox>
          );
        })}
      </div>
    </Chakra.CheckboxGroup>
  );
}

export default CheckboxGroup;

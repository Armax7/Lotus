import * as Chakra from "@chakra-ui/react";
import { useState } from "react";

const SearchBar = ({
  value: valueProp,
  onChange = () => {},
  onSearch = () => {},
  onEnter = () => {},
  className,
  ...props
}) => {

  const handleSearch = async (event) => {
    event.preventDefault();
    onSearch(event);
  };

  const handleInputChange = (event) => {
    onChange(event);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(event);
      onEnter();
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <Chakra.Flex
        alignItems="center"
        position={"relative"}
        width="max-content"
        {...props}
      >
        <Chakra.Input
          placeholder={"Search"}
          required
          type="search"
          name="search"
          value={valueProp}
          height="40px"
          fontSize="15px"
          border="none"
          color="var(--color5)"
          outline="none"
          width="40px"
          transition="width 0.4s ease-in-out"
          _focus={{
            width: "200px",
            cursor: "text",
          }}
          _placeholder={{ color: "var(--color5)" }}
          backgroundColor="var(--color1)"
          borderRadius="50px"
          cursor="pointer"
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <Chakra.Box
          position="absolute"
          width="40px"
          height="40px"
          top="0"
          left="0"
          padding="8px"
          pointerEvents="none"
        >
          <svg
            viewBox="0 0 512 512"
            className="ionicon"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Search</title>
            <path
              strokeWidth="32"
              strokeMiterlimit="10"
              stroke="var(--color5)"
              fill="none"
              d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
            ></path>
            <path
              d="M338.29 338.29L448 448"
              strokeWidth="32"
              strokeMiterlimit="10"
              strokeLinecap="round"
              stroke="var(--color5)"
              fill="none"
            ></path>
          </svg>
        </Chakra.Box>
      </Chakra.Flex>
    </form>
  );
};

export default SearchBar;

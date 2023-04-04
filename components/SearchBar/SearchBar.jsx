import * as Chakra from "@chakra-ui/react";
import { useState } from "react";

const SearchBar = ({ onSearch = () => {}, className, ...props }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log(query);
    onSearch(event);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  /*  const handleSubmit = (event) => {
    event.preventDefault();
    artworksNames(query)
    setQuery("")
  }; */

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
          value={query}
          height="40px"
          fontSize="15px"
          border="none"
          color="gray.800"
          outline="none"
          width="40px"
          transition="width 0.4s ease-in-out"
          _focus={{
            width: "200px",
            cursor: "text",
            boxShadow:
              "0px 0px 0px #0e0e0e, 0px 0px 0px rgb(95 94 94 / 25%), inset 1.5px 1.5px 3px #0e0e0e, inset -1.5px -1.5px 3px #5f5e5e",
          }}
          backgroundColor="gray.300"
          boxShadow="1.5px 1.5px 3px #0e0e0e, -1.5px -1.5px 3px rgb(95 94 94 / 25%), inset 0px 0px 0px #0e0e0e, inset 0px -0px 0px #5f5e5e"
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
              stroke="currentColor"
              fill="none"
              d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
            ></path>
            <path
              d="M338.29 338.29L448 448"
              strokeWidth="32"
              strokeMiterlimit="10"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
            ></path>
          </svg>
        </Chakra.Box>
      </Chakra.Flex>
    </form>
  );
};

export default SearchBar;

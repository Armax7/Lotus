import * as Chakra from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";

export default function ToTopButton() {
  function scrollToTop(){
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  }
  return (
    <Chakra.Button
    onClick={scrollToTop}
    position={"fixed"}
    bottom={"40px"}
    right={"40px"}
      bg={"var(--black-1)"}
      color={"var(--color5)"}
      borderRadius={"100px"}
      w={"48px"}
      h={"48px"}
      fontSize={"24px"}
      _hover={{
        background: "var(--black)",
        transform: "translateY(-4px)",
      }}
    >
      <ChevronUpIcon />
    </Chakra.Button>
  );
}

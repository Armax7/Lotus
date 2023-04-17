import * as Chakra from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

export default function ToTopButton() {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  const [toTop, setToTop] = useState(false);

  useEffect(()=>{
    window.addEventListener("scroll", () => {
      window.scrollY >= 140 ? setToTop(true) : setToTop(false);
    });
  },[])

  function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight, "smooth");
  }


  return (
    <Chakra.Button
      onClick={toTop ? scrollToTop : scrollToBottom}
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
      {toTop ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </Chakra.Button>
  );
}

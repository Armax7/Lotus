import Link from "next/link";
import * as Chakra from "@chakra-ui/react";
import Router from "next/router";
function BackButton({ ...props }) {
  return (
    <Chakra.Button
      onClick={() => Router.back()}
      w={"40px"}
      h={"40px"}
      bgColor="var(--color2)"
      _hover={{ bgColor: "var(--color1)", transform: "translateY(-4px)" }}
      color="var(--color5)"
      borderRadius={"100px"}
      display={"flex"}
      alignContent={"center"}
      justifyItems={"center"}
      {...props}
    >
      <Chakra.Icon boxSize={6} color="var(--color5)" viewBox="1 0 20 20">
        <path
          fill="currentColor"
          d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"
        />
      </Chakra.Icon>
    </Chakra.Button>
  );
}

export default BackButton;

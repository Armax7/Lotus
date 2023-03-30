import Link from "next/link";
import { useRouter } from "next/router";
import * as Chakra from "@chakra-ui/react";

function NavBar({ classname, ...props }) {
  const router = useRouter();

  return (
    <Chakra.Flex as="nav" className={classname} {...props}>
      <Link href="/search">
        <Chakra.Button bgColor="blackAlpha.800" color="red.600">
          Search
        </Chakra.Button>
      </Link>
    </Chakra.Flex>
  );
}

export default NavBar;

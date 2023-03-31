import * as Components from "../../components";
import * as Chakra from "@chakra-ui/react";
import * as Layouts from "../../layouts";

function index() {
  return (
    <Chakra.Box>
      Art Details Supreme
      <Components.BackButton href={"/"} />
      <Layouts.Artworks />
    </Chakra.Box>
  );
}

export default index;

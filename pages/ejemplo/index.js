import * as Components from "../../components";
import * as Chakra from "@chakra-ui/react";
import * as Layouts from "../../layouts";
import { cardMock } from "../../helpers/mocks/components_mocks/Cards_mock";

function index() {
  return (
    <Chakra.Box>
      Art Details Supreme
      <Components.BackButton href={"/"} />
      <Components.UpdateArtworkForm artwork={cardMock} />
      <Components.LogOutButton />
    </Chakra.Box>
  );
}

export default index;

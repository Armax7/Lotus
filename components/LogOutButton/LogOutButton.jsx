import * as Chakra from "@chakra-ui/react";
import * as UserAuth from "../../helpers/supabase_helpers/user_management";

function LogOutButton({
  colorScheme = "blue",
  backgroundColor = "red.400",
  marginRight = "auto",
  marginLeft = "auto",
  marginTop = "auto",
  marginBottom = "auto",
}) {
  const handleLogout = async () => {
    try {
      await UserAuth.userLogOut();
      console.log(await UserAuth.loggedStatus());
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Chakra.Button
      colorScheme={colorScheme}
      bg={backgroundColor}
      onClick={() => {
        handleLogout();
      }}
      mr={marginRight}
      ml={marginLeft}
      mt={marginTop}
      mb={marginBottom}
    >
      Log Out
    </Chakra.Button>
  );
}

export default LogOutButton;

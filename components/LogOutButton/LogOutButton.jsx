import * as Chakra from "@chakra-ui/react";
import * as UserAuth from "../../helpers/supabase_helpers/user_management";
import { useRouter } from "next/router";

function LogOutButton({
  colorScheme = "blue",
  backgroundColor = "red.400",
  marginRight = "auto",
  marginLeft = "auto",
  marginTop = "auto",
  marginBottom = "auto",
}) {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await UserAuth.userLogOut();
      router.push("/");
      router.reload();
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

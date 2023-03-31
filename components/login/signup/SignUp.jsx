import * as chakra from "@chakra-ui/react";
import style from "../../../styles/login/signup.module.css";

export default function SignUp() {
  return (
    <chakra.HStack w="full" h="100vh">
      <chakra.Flex
        w="full"
        h="full"
        alignItems="center"
        justifyContent="center"
        borderRightWidth={1}
        display={{ base: "none", md: "flex" }}
      >
        <chakra.Stack w="full" maxW="md" spacing={4} p={6}>
          <chakra.Heading fontSize="2xl">Sign up</chakra.Heading>
          <hr className={style.hr} />
          <div className={style.all_name_wrapper}>
            <chakra.FormControl id="firstName" style={{margin:"2px"}}>
              <chakra.FormLabel>First Name</chakra.FormLabel>
              <chakra.Input placeholder="First Name" />
            </chakra.FormControl>

            <chakra.FormControl id="lastName" style={{margin:"2px"}}>
              <chakra.FormLabel>Last Name</chakra.FormLabel>
              <chakra.Input placeholder="Last Name" />
            </chakra.FormControl>

          </div>

            <chakra.FormControl id="email">
              <chakra.FormLabel>Email</chakra.FormLabel>
              <chakra.Input placeholder="user@gmail.com" />
            </chakra.FormControl>

          <chakra.FormControl id="password">
            <chakra.FormLabel>Password</chakra.FormLabel>
            <chakra.Input type="password" placeholder="******" />
          </chakra.FormControl>

          <chakra.FormControl id="passwordConfirm">
            <chakra.FormLabel>Confirm your Password</chakra.FormLabel>
            <chakra.Input type="password" placeholder="******" />
          </chakra.FormControl>

          <chakra.Button>Create Account</chakra.Button>
        </chakra.Stack>
      </chakra.Flex>
    </chakra.HStack>
  );
}

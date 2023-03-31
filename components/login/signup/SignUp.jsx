import * as chakra from "@chakra-ui/react";
import style from "../../../styles/login/signup.module.css";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function SignUp() {
  function handleOnSubmit(e) {
    e.preventDefault();
    console.log("sign up submit press with no functionality");
  }
  return (
    <form
      onSubmit={(e) => {
        handleOnSubmit(e);
      }}
      className={style.form}
    >
      <chakra.HStack className={style.HStack}>
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

            <div className={style.separator}>
              <hr className={style.hr} />
              <p className={style.separator_text}>With</p>
              <hr className={style.hr} />
            </div>

            <chakra.Stack>
              <div className={style.auth}>
                <chakra.Button colorScheme="gray" leftIcon={<FcGoogle />}>
                  Google
                </chakra.Button>
                <chakra.Button colorScheme="facebook" leftIcon={<FaFacebook />}>
                  Facebook
                </chakra.Button>
              </div>
            </chakra.Stack>

            <div className={style.separator}>
              <hr className={style.hr} />
              <p className={style.separator_text}>Or</p>
              <hr className={style.hr} />
            </div>

            <div className={style.all_name_wrapper}>
              <chakra.FormControl id="firstName" style={{ margin: "2px" }}>
                <chakra.FormLabel>First Name</chakra.FormLabel>
                <chakra.Input placeholder="First Name" />
              </chakra.FormControl>

              <chakra.FormControl id="lastName" style={{ margin: "2px" }}>
                <chakra.FormLabel>Last Name</chakra.FormLabel>
                <chakra.Input placeholder="Last Name" />
              </chakra.FormControl>
            </div>

            <chakra.FormControl id="email">
              <chakra.FormLabel>Email</chakra.FormLabel>
              <chakra.Input placeholder="user@gmail.com" />
            </chakra.FormControl>

            <chakra.FormControl id="passwordSignUp">
              <chakra.FormLabel>Password</chakra.FormLabel>
              <chakra.Input type="password" placeholder="******" />
            </chakra.FormControl>

            <chakra.FormControl id="passwordConfirm">
              <chakra.FormLabel>Confirm your Password</chakra.FormLabel>
              <chakra.Input type="password" placeholder="******" />
            </chakra.FormControl>

            <chakra.Button type="submit">Create Account</chakra.Button>
          </chakra.Stack>
        </chakra.Flex>
      </chakra.HStack>
    </form>
  );
}

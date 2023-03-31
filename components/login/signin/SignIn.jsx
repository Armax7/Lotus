import * as chakra from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import style from "../../../styles/login/signin.module.css";

export default function SignIn() {
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
          <chakra.Heading fontSize="2xl">
            Sign in to your Account
          </chakra.Heading>

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

          <chakra.FormControl id="user">
            <chakra.FormLabel>Username Or Email</chakra.FormLabel>
            <chakra.Input placeholder="Username / Email" />
          </chakra.FormControl>

          <chakra.FormControl id="password">
            <chakra.FormLabel>Password</chakra.FormLabel>
            <chakra.Input type="password" placeholder="******" />
          </chakra.FormControl>

          <chakra.Stack
            spacing={4}
            direction="row"
            align="start"
            justify="space-between"
          >
            <chakra.Checkbox>Remember me</chakra.Checkbox>
            <chakra.Link>Forgot password</chakra.Link>
          </chakra.Stack>
          <chakra.Button>log in</chakra.Button>
          <chakra.Button>Sign up</chakra.Button>
        </chakra.Stack>
      </chakra.Flex>
    </chakra.HStack>
  );
}

import * as chakra from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import style from "../../../styles/login/signin.module.css";
import Link from "next/link";

export default function SignIn( {className, ...props }) {
  function handleOnSubmit(e) {
    e.preventDefault();
    console.log("sign in submit press with no functionality");
  }

  return (
    <form onSubmit={(e) => handleOnSubmit(e)} className={style.form} >
      <chakra.Box w="full" maxW="lg" spacing={8} p={8} bgColor="#F9F5E7" >
      <chakra.HStack className={className} {...props}>
        <chakra.Flex
          w="full"
          h="full"
         
          alignItems="center"
          justifyContent="center"
          borderRightWidth={1}
          display={{ base: "none", md: "flex" }}
        >
          <chakra.Stack w="full" maxW="lg" spacing={8} p={8} >
           <chakra.Box display="flex" justifyContent="center" alignItems="flex-end"> 
            <chakra.Heading fontSize="2xl" >
              Sign in to your Account
            </chakra.Heading>
            </chakra.Box> 

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

            <chakra.FormControl id="email">
              <chakra.FormLabel>Email</chakra.FormLabel>
              <chakra.Input placeholder="user@email.com" />
            </chakra.FormControl>

            <chakra.FormControl id="passwordSignIn">
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

            <chakra.Button type="submit">Log in</chakra.Button>

            <chakra.Button style={{ width: "100%" }}>Sign up</chakra.Button>
          </chakra.Stack>
        </chakra.Flex>
      </chakra.HStack>
      </chakra.Box>
    </form>
  );
}

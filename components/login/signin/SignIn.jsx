import * as chakra from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import { supabase } from "../../../lib/supabaseClient";

import { useState } from "react";
import style from "../../../styles/login/signin.module.css";
import validate from "./validation";



export default function SignIn({ ...props }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
   
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
   
  });

  const [submitted, setSubmitted] = useState(false);

  function handleInputOnChange(event) {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    console.log("onChange Triggered");
  }

  function handleInputOnClick(event) {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [event.target.name]: "",
    }));
  }

 
  async function handleOnSubmit(event) {
    event.preventDefault();

    console.log("sign in submit press with no functionality");
    const localData = {
      ...formData,
      email: formData.email.trim(),
    };
    setErrors(validate({ ...localData }));
    const currentErrors = validate(localData);
    console.log(currentErrors, errors);
    setSubmitted(true);

    if (Object.values(currentErrors).length <= 0) {
      console.log("Submited with values: ", localData);
      setFormData({
        email: "",
        password: "",
      });
      setErrors({
        email: "",
        password: "",
      });
    }
  }

  
  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    console.log(data, error)
  }

  async function signInWithFacebook() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
    })
  }

  return (
    <form onSubmit={(e) => handleOnSubmit(e)} className={style.form} >
      
      <chakra.HStack className={style.HStack} {...props}>
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
                <chakra.Button colorScheme="gray" leftIcon={<FcGoogle />} onClick={signInWithGoogle}>
                  Google
                </chakra.Button>
                <chakra.Button colorScheme="facebook" leftIcon={<FaFacebook />} onClick={signInWithFacebook}>
                  Facebook
                </chakra.Button>
              </div>
            </chakra.Stack>
            

            <div className={style.separator}>
              <hr className={style.hr} />
              <p className={style.separator_text}>Or</p>
              <hr className={style.hr} />
            </div>

            <chakra.FormControl
              id="emailSignIn"
              isInvalid={submitted && !!errors.email}
            >
              <chakra.FormLabel>Email</chakra.FormLabel>
              <chakra.Input
                name="email"
                value={formData.email}
                onChange={handleInputOnChange}
                onClick={handleInputOnClick}
                placeholder="user@email.com"
              />
              {submitted && !!errors.email ? (
                <chakra.FormHelperText>{errors.email}</chakra.FormHelperText>
              ) : (
                <chakra.FormHelperText>Enter your email.</chakra.FormHelperText>
              )}
            </chakra.FormControl>

            <chakra.FormControl
              id="passwordSignIn"
              isInvalid={submitted && !!errors.password}
            >
              <chakra.FormLabel>Password</chakra.FormLabel>
              <chakra.Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputOnChange}
                onClick={handleInputOnClick}
                placeholder="******"
              />
              {submitted && !!errors.password ? (
                <chakra.FormHelperText>
                  <chakra.Box>{errors.password}</chakra.Box>
                </chakra.FormHelperText>
              ) : (
                <chakra.FormHelperText>
                  Enter your password.
                </chakra.FormHelperText>
              )}
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
     
    </form>
  );
}

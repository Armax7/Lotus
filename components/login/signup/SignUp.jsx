import style from "../../../styles/login/signup.module.css";
import * as Chakra from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useState } from "react";

import { supabase } from "../../../lib/supabaseClient";

import validate from "./validate";
import * as UserAuth from "../../../helpers/supabase_helpers/user_management";
import * as QueryFns from "../../../helpers/page_helpers/Home_helpers/query_fn";
import * as QueryKeys from "../../../helpers/page_helpers/Home_helpers/query_keys";

function SignUp({ ...props }) {
  const queryClient = ReactQuery.useQueryClient();

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  async function signInWithFacebook() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
    });
  }

  async function signout() {
    const { error } = await supabase.auth.signOut();
  }

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const signUpMutation = ReactQuery.useMutation(QueryFns.postUserDetailsAxios);

  function handleInputOnChange(event) {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
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
    const localData = {
      ...formData,
      name: formData.name.trim(),
      lastname: formData.lastname.trim(),
      email: formData.email.trim(),
    };
    setErrors(validate({ ...localData }));
    const currentErrors = validate(localData);
    setSubmitted(true);

    if (Object.values(currentErrors).length <= 0) {
      const signUpData = await UserAuth.userEmailSignUp({
        email: formData.email,
        password: formData.password,
      });

      if (signUpData.user.id) {
        await signUpMutation.mutate({
          id: signUpData.user.id,
          name: formData.name + " " + formData.lastname,
        });
      }

      setFormData({
        name: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({
        name: "",
        description: "",
        release: "",
        rating: "",
        genres: "",
        platforms: "",
      });
    }
  }
  return (
    <form onSubmit={(e) => handleOnSubmit(e)} className={style.form} {...props}>
      <Chakra.HStack className={style.HStack}>
        <Chakra.Flex
          w="full"
          h="full"
          alignItems="center"
          justifyContent="center"
          borderRightWidth={1}
          display={{ base: "none", md: "flex" }}
        >
          <Chakra.Stack w="full" maxW="md" spacing={4} p={6}>
            <Chakra.Box
              display="flex"
              justifyContent="center"
              alignItems="flex-end"
            >
              <Chakra.Heading fontSize="2xl">Sign up</Chakra.Heading>
            </Chakra.Box>
            <div className={style.separator}>
              <hr className={style.hr} />
              <p className={style.separator_text}>With</p>
              <hr className={style.hr} />
            </div>

            <Chakra.Stack>
              <div className={style.auth}>
                <Chakra.Button
                  colorScheme="gray"
                  leftIcon={<FcGoogle />}
                  onClick={signInWithGoogle}
                >
                  Google
                </Chakra.Button>
                <Chakra.Button
                  colorScheme="facebook"
                  leftIcon={<FaFacebook />}
                  onClick={signInWithFacebook}
                >
                  Facebook
                </Chakra.Button>
              </div>
            </Chakra.Stack>

            <div className={style.separator}>
              <hr className={style.hr} />
              <p className={style.separator_text}>Or</p>
              <hr className={style.hr} />
            </div>

            <div className={style.all_name_wrapper}>
              <Chakra.FormControl
                id="firstName"
                isInvalid={submitted && !!errors.name}
                style={{ margin: "2px" }}
              >
                <Chakra.FormLabel>First Name</Chakra.FormLabel>
                <Chakra.Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputOnChange}
                  onClick={handleInputOnClick}
                  placeholder="First Name"
                />
                {submitted && !!errors.name ? (
                  <Chakra.FormHelperText>{errors.name}</Chakra.FormHelperText>
                ) : (
                  <Chakra.FormHelperText>
                    Enter your name.
                  </Chakra.FormHelperText>
                )}
              </Chakra.FormControl>

              <Chakra.FormControl
                id="lastName"
                isInvalid={submitted && !!errors.lastname}
                style={{ margin: "2px" }}
              >
                <Chakra.FormLabel>Surname</Chakra.FormLabel>
                <Chakra.Input
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputOnChange}
                  onClick={handleInputOnClick}
                  placeholder="Surname"
                />
                {submitted && !!errors.lastname ? (
                  <Chakra.FormHelperText>
                    {errors.lastname}
                  </Chakra.FormHelperText>
                ) : (
                  <Chakra.FormHelperText>
                    Enter your surname.
                  </Chakra.FormHelperText>
                )}
              </Chakra.FormControl>
            </div>

            <Chakra.FormControl
              id="email"
              isInvalid={submitted && !!errors.email}
            >
              <Chakra.FormLabel>Email</Chakra.FormLabel>
              <Chakra.Input
                name="email"
                value={formData.email}
                onChange={handleInputOnChange}
                onClick={handleInputOnClick}
                placeholder="user@email.com"
              />
              {submitted && !!errors.email ? (
                <Chakra.FormHelperText>{errors.email}</Chakra.FormHelperText>
              ) : (
                <Chakra.FormHelperText>Enter your email.</Chakra.FormHelperText>
              )}
            </Chakra.FormControl>

            <Chakra.FormControl
              id="passwordSignUp"
              isInvalid={submitted && !!errors.password}
            >
              <Chakra.FormLabel>Password</Chakra.FormLabel>
              <Chakra.Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputOnChange}
                onClick={handleInputOnClick}
                placeholder="Password"
              />
              {submitted && !!errors.password ? (
                <Chakra.FormHelperText>
                  <Chakra.Box>{errors.password}</Chakra.Box>
                </Chakra.FormHelperText>
              ) : (
                <Chakra.FormHelperText>
                  Enter your password.
                </Chakra.FormHelperText>
              )}
            </Chakra.FormControl>

            <Chakra.FormControl
              id="passwordConfirm"
              isInvalid={submitted && !!errors.confirmPassword}
            >
              <Chakra.FormLabel>Confirm your Password</Chakra.FormLabel>
              <Chakra.Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputOnChange}
                onClick={handleInputOnClick}
                placeholder="Confirm password"
              />
              {submitted && !!errors.confirmPassword ? (
                <Chakra.FormHelperText>
                  {errors.confirmPassword}
                </Chakra.FormHelperText>
              ) : (
                <Chakra.FormHelperText>
                  Confirm your password.
                </Chakra.FormHelperText>
              )}
            </Chakra.FormControl>

            {submitted && !!errors.password ? (
              <Chakra.Box>
                <Chakra.Alert status="error">
                  <Chakra.AlertIcon />
                  <Chakra.AlertTitle>Password is invalid.</Chakra.AlertTitle>
                </Chakra.Alert>
                <Chakra.Alert status="info">
                  <Chakra.AlertIcon />
                  <Chakra.AlertDescription>
                    It should contain 8-16 characters
                  </Chakra.AlertDescription>
                </Chakra.Alert>
                <Chakra.Alert status="info">
                  <Chakra.AlertIcon />
                  <Chakra.AlertDescription>
                    Must have at least one upper case and one lower case.
                  </Chakra.AlertDescription>
                </Chakra.Alert>
                <Chakra.Alert status="info">
                  <Chakra.AlertIcon />
                  <Chakra.AlertDescription>
                    Must have a special character .@$!%*?&
                  </Chakra.AlertDescription>
                </Chakra.Alert>
                <Chakra.Alert status="info">
                  <Chakra.AlertIcon />
                  <Chakra.AlertDescription>
                    Must not have any whitespaces
                  </Chakra.AlertDescription>
                </Chakra.Alert>
              </Chakra.Box>
            ) : null}

            {signUpMutation.isError ? (
              <Chakra.Alert status="error">
                <Chakra.AlertIcon />
                <Chakra.Box>
                  <Chakra.AlertTitle>
                    Error {signUpMutation.error.status}{" "}
                    {`(${signUpMutation.error.statusText})`}:
                  </Chakra.AlertTitle>
                  <Chakra.AlertDescription>
                    {signUpMutation.error.status === 409
                      ? "User already exists"
                      : `${signUpMutation.error.data.error}`}
                  </Chakra.AlertDescription>
                </Chakra.Box>
              </Chakra.Alert>
            ) : null}

            <Chakra.Button type="submit">Create Account</Chakra.Button>
          </Chakra.Stack>
        </Chakra.Flex>
      </Chakra.HStack>
    </form>
  );
}

export async function getServerSideProps() {
  const queryClient = new ReactQuery.QueryClient();

  await queryClient.prefetchQuery(
    [QueryKeys.QK_USER_DETAILS],
    QueryFns.getUserDetailsAxios
  );

  return {
    props: {
      dehydratedState: ReactQuery.dehydrate(queryClient),
    },
  };
}

export default SignUp;

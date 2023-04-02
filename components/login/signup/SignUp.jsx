import style from "../../../styles/login/signup.module.css";
import * as Chakra from "@chakra-ui/react";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useState } from "react";

import * as Utils from "../../../helpers/utils";
import validate from "./validate";

export default function SignUp({ ...props }) {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    release: "",
    rating: "",
    genres: "",
    platforms: "",
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
    const localData = {
      ...formData,
      name: formData.name.trim(),
      lastname: formData.lastname.trim(),
      email: formData.email.trim(),
    };
    setErrors(validate({ ...localData }));
    const currentErrors = validate(localData);
    console.log(currentErrors, errors);
    setSubmitted(true);

    if (Object.values(currentErrors).length <= 0) {
      console.log("Submited with values: ", localData);
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
            <Chakra.Heading fontSize="2xl">Sign up</Chakra.Heading>

            <div className={style.separator}>
              <hr className={style.hr} />
              <p className={style.separator_text}>With</p>
              <hr className={style.hr} />
            </div>

            <Chakra.Stack>
              <div className={style.auth}>
                <Chakra.Button colorScheme="gray" leftIcon={<FcGoogle />}>
                  Google
                </Chakra.Button>
                <Chakra.Button colorScheme="facebook" leftIcon={<FaFacebook />}>
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
                    Must have a special character .!@#$%^&*
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

            <Chakra.Button type="submit">Create Account</Chakra.Button>
          </Chakra.Stack>
        </Chakra.Flex>
      </Chakra.HStack>
    </form>
  );
}

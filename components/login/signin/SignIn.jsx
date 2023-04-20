import style from "../../../styles/login/signin.module.css";
import Link from "next/link";
import { useState } from "react";
import * as chakra from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import validate from "./validation";
import { supabase } from "../../../lib/supabaseClient";
import * as UserAuth from "../../../helpers/supabase_helpers/user_management";
import { useRouter } from "next/router";

export default function SignIn({ onClose: onCloseProp = () => {}, ...props }) {
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
      try {
        const data = await UserAuth.userEmailLogIn(formData);
        console.log(data);
        setShowAlert(true);

        location.reload();
      } catch (error) {
        console.log(error);
      }
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
      provider: "google",
    });
  }

  async function signInWithFacebook() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
    });
  }

  const [showAlert, setShowAlert] = useState(false);

  const handleButtonClick = () => {
    setShowAlert(true);
  };

  return (
    <form onSubmit={(e) => handleOnSubmit(e)} className={style.form}>
      <button onClick={handleButtonClick}>Show alert</button>

      {showAlert && (
        <chakra.Alert
          status="success"
          variant="subtle"
          justifyContent="center"
          borderRadius={"2xl"}
          color="blackAlpha"
          display={"flex"}
          flexDir={"column"}
          m={"0 0 12px"}
        >
          <chakra.AlertIcon />
          Bienvenido a Lotus ¡Has iniciado sesión exitosamente!
        </chakra.Alert>
      )}

      <chakra.HStack className={style.HStack} {...props}>
        <chakra.Flex
          w="100%"
          alignItems="center"
          justifyContent="center"
          fontFamily="Poppins"
        >
          <chakra.Stack w="100%" spacing={8} p={8}>
            <chakra.Box
              display="flex"
              justifyContent="center"
              alignItems="flex-end"
            >
              <chakra.Heading fontSize="2xl" fontFamily="Poppins">
                Ingresa a tu cuenta
              </chakra.Heading>
            </chakra.Box>

            <div className={style.separator}>
              <hr className={style.hr} />
              <p className={style.separator_text}>Con</p>
              <hr className={style.hr} />
            </div>

            <chakra.Stack>
              <div className={style.auth}>
                <chakra.Button
                  colorScheme="gray"
                  leftIcon={<FcGoogle />}
                  onClick={signInWithGoogle}
                >
                  Google
                </chakra.Button>
                <chakra.Button
                  colorScheme="facebook"
                  leftIcon={<FaFacebook />}
                  onClick={signInWithFacebook}
                >
                  Facebook
                </chakra.Button>
              </div>
            </chakra.Stack>

            <div className={style.separator}>
              <hr className={style.hr} />
              <p className={style.separator_text}>O</p>
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
                placeholder="usuario@email.com"
              />
              {submitted && !!errors.email ? (
                <chakra.FormHelperText>{errors.email}</chakra.FormHelperText>
              ) : (
                <chakra.FormHelperText>
                  Ingresa tu correo.
                </chakra.FormHelperText>
              )}
            </chakra.FormControl>

            <chakra.FormControl
              id="passwordSignIn"
              isInvalid={submitted && !!errors.password}
            >
              <chakra.FormLabel>Contraseña</chakra.FormLabel>
              <chakra.Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputOnChange}
                onClick={handleInputOnClick}
                placeholder="Contraseña"
              />
              {submitted && !!errors.password ? (
                <chakra.FormHelperText>
                  <chakra.Box>{errors.password}</chakra.Box>
                </chakra.FormHelperText>
              ) : (
                <chakra.FormHelperText>
                  Ingresa tu contraseña.
                </chakra.FormHelperText>
              )}
            </chakra.FormControl>

            <chakra.Stack
              spacing={4}
              direction="row"
              align="start"
              justify="space-between"
            >
              <chakra.Checkbox
                colorScheme="lotus"
                borderColor={"var(--color1)"}
              >
                Recuerdame
              </chakra.Checkbox>
              <Link href={"/password-recovery"}>
                <a onClick={onCloseProp}>¿Olvidaste tu contraseña?</a>
              </Link>
            </chakra.Stack>

            <chakra.Button
              bg="var(--color2)"
              color="var(--color5)"
              _hover={{
                background: "var(--color2-1)",
                transform: "translateY(-4px)",
              }}
              type="submit"
              onClick={handleOnSubmit}
            >
              Ingresar
            </chakra.Button>
          </chakra.Stack>
        </chakra.Flex>
      </chakra.HStack>
    </form>
  );
}

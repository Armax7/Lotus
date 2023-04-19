import style from "../../styles/login/signup.module.css";
import * as Chakra from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import { useState } from "react";

import validate from "./validate";
import * as UserAuth from "../../helpers/supabase_helpers/user_management";
import * as QueryFns from "../../helpers/page_helpers/Home_helpers/query_fn";
import * as QueryKeys from "../../helpers/page_helpers/Home_helpers/query_keys";

function ChangePasswordForm({
  onSubmit: onSubmitProp = () => {},
  onClose: onCloseProp = () => {},
  className: classNameProp = style.HStack,
  ...props
}) {
  const queryClient = ReactQuery.useQueryClient();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const signUpMutation = ReactQuery.useMutation();

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
    };
    setErrors(validate({ ...localData }));
    const currentErrors = validate(localData);
    setSubmitted(true);

    if (Object.values(currentErrors).length <= 0) {
      onSubmitProp(localData);
      onCloseProp();

      setFormData({
        password: "",
        confirmPassword: "",
      });
      setErrors({
        password: "",
        confirmPassword: "",
      });
    }
  }
  return (
    <form onSubmit={(e) => handleOnSubmit(e)} className={style.form}>
      <Chakra.HStack className={classNameProp} {...props}>
        <Chakra.Flex
          w="100%"
          alignItems="center"
          justifyContent="center"
          fontFamily={"Poppins"}
          // display={{ base: "none", md: "flex" }}
        >
          <Chakra.Stack w="full" maxW="md" spacing={4} p={6}>
            <Chakra.Box
              display="flex"
              justifyContent="center"
              alignItems="flex-end"
            >
              <Chakra.Heading fontSize="2xl" fontFamily={"Poppins"}>
                Cambiar de contraseña
              </Chakra.Heading>
            </Chakra.Box>

            <Chakra.FormControl
              id="newPassword"
              isInvalid={submitted && !!errors.password}
            >
              <Chakra.FormLabel>Contraseña</Chakra.FormLabel>
              <Chakra.Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputOnChange}
                onClick={handleInputOnClick}
                placeholder="Contraseña"
              />
              {submitted && !!errors.password ? (
                <Chakra.FormHelperText>
                  <Chakra.Box>{errors.password}</Chakra.Box>
                </Chakra.FormHelperText>
              ) : (
                <Chakra.FormHelperText>
                  Ingresa tu contraseña.
                </Chakra.FormHelperText>
              )}
            </Chakra.FormControl>

            <Chakra.FormControl
              id="newPasswordConfirm"
              isInvalid={submitted && !!errors.confirmPassword}
            >
              <Chakra.FormLabel>Confirma tu contraseña</Chakra.FormLabel>
              <Chakra.Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputOnChange}
                onClick={handleInputOnClick}
                placeholder="Confirma tu contraseña"
              />
              {submitted && !!errors.confirmPassword ? (
                <Chakra.FormHelperText>
                  {errors.confirmPassword}
                </Chakra.FormHelperText>
              ) : (
                <Chakra.FormHelperText>
                  Confirma tu contraseña
                </Chakra.FormHelperText>
              )}
            </Chakra.FormControl>

            {submitted && !!errors.password ? (
              <Chakra.Box>
                <Chakra.Alert status="error">
                  <Chakra.AlertIcon />
                  <Chakra.AlertTitle>Contraseña invalida</Chakra.AlertTitle>
                </Chakra.Alert>
                <Chakra.Alert status="info">
                  <Chakra.AlertIcon />
                  <Chakra.AlertDescription>
                    Debe contener entre 8 - 16 caracteres
                  </Chakra.AlertDescription>
                </Chakra.Alert>
                <Chakra.Alert status="info">
                  <Chakra.AlertIcon />
                  <Chakra.AlertDescription>
                    Debe contener al menos una letra mayuscula y una minuscula.
                  </Chakra.AlertDescription>
                </Chakra.Alert>
                <Chakra.Alert status="info">
                  <Chakra.AlertIcon />
                  <Chakra.AlertDescription>
                    Debe contener al menos un caracter especial .@$!%*?&
                  </Chakra.AlertDescription>
                </Chakra.Alert>
                <Chakra.Alert status="info">
                  <Chakra.AlertIcon />
                  <Chakra.AlertDescription>
                    No deben haber espacios en blanco
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

            <Chakra.Button
              type="submit"
              bg="var(--color1)"
              color="var(--color5)"
              _hover={{
                background: "var(--color1-3)",
                transform: "translateY(-4px)",
              }}
              style={{ width: "100%" }}
            >
              Cambiar contraseña
            </Chakra.Button>
          </Chakra.Stack>
        </Chakra.Flex>
      </Chakra.HStack>
    </form>
  );
}

export default ChangePasswordForm;

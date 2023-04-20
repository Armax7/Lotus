import style from "../../styles/login/signin.module.css";
import { useState } from "react";
import * as chakra from "@chakra-ui/react";
import validate from "./validation";

function RecoveryForm({
  onSubmit: onSubmitProp = () => {},
  onClose: onCloseProp = () => {},
  ...props
}) {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);

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
      email: formData.email.trim(),
    };
    setErrors(validate({ ...localData }));
    const currentErrors = validate(localData);
    console.log(currentErrors, errors);
    setSubmitted(true);

    if (Object.values(currentErrors).length <= 0) {
      console.log("Submited with values: ", localData);

      onSubmitProp(localData);
      onCloseProp();

      setFormData({
        email: "",
      });
      setErrors({
        email: "",
      });
    }
  }

  return (
    <form onSubmit={handleOnSubmit} className={style.form}>
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
                Restablecer contraseña
              </chakra.Heading>
            </chakra.Box>

            <chakra.FormControl
              id="recoveryEmail"
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
              Enviar correo de recuperación
            </chakra.Button>
          </chakra.Stack>
        </chakra.Flex>
      </chakra.HStack>
    </form>
  );
}

export default RecoveryForm;

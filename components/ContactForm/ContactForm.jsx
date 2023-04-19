import { useState, useEffect, useRef } from "react";
import * as Chakra from "@chakra-ui/react";
import Link from "next/link";
import * as SupaHelpers from "../../helpers/supabase_helpers/user_management";
import { sendEmail } from "../../helpers/email_sendEmail";
import { contactForm } from "../../helpers/email_templates";
import * as Components from "..";
import React from "react";
import * as ReactQuery from "@tanstack/react-query";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { isOpen, onOpen, onClose } = Chakra.useDisclosure();

  const [isMessageSent, setIsMessageSent] = useState(null);
  const [user, setUser] = useState(null);
  const [mail, setMail] = useState(null);
  const finalFocusRef = useRef();

  const SignIn = Chakra.useDisclosure();
  const singUp = Chakra.useDisclosure();

  const logIn = Chakra.useDisclosure();

  const btnRef = React.useRef();
  const OverlayOne = () => <Chakra.ModalOverlay />;
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  const loguearse = async () => {
    const data = await SupaHelpers.loggedStatus();
    if (data === true) {
      const user = await SupaHelpers.getUserName();
      const mail = await SupaHelpers.getUserEmail();
      setUser(user);
      setMail(mail);
      setName(user || "");
      setEmail(mail || "");
    }
  };

  useEffect(() => {
    loguearse();
  }, []);

  let emailData = {
    email: "lotus.art.gallery.mail@gmail.com",
    subject: `Hola, soy ${name} y me gustaria comunicarme con ustedes!`,
    text: "Lotus - Quisiera comunicarme con ustedes",
    html: contactForm(name, email, message),
  };

  const emailMutation = ReactQuery.useMutation(sendEmail, {
    onSuccess: () => {
      setIsMessageSent(true);
      setMessage("");
    },
    onError: () => {
      setIsMessageSent(false);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    emailMutation.mutate(emailData);
  };
  return (
    <>
      <Chakra.Text
        onClick={() => {
          setIsMessageSent(null);
          onOpen();
        }}
        transition={"transform .2s"}
        _hover={{ transform: "translateY(-2px)" }}
        cursor={"pointer"}
      >
        Contacto
      </Chakra.Text>
      <Chakra.Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setIsMessageSent(null);
        }}
        finalFocusRef={finalFocusRef}
        isCentered
      >
        <Chakra.ModalOverlay />
        <Chakra.ModalContent
          bg="var(--color5)"
          borderRadius={"12px"}
          padding={"12px"}
        >
          <Chakra.ModalHeader>
            <svg
              style={{
                width: "100%",
                minWidth: "180px",
                maxWidth: "300px",
                margin: "auto",
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 304.13 58.64"
            >
              <title>Recurso 1</title>
              <g id="Capa_2" data-name="Capa 2">
                <g id="Capa_1-2" data-name="Capa 1">
                  <path
                    fill="var(--color2)"
                    d="M114.6,58.46c-5.11.62-10.25-1.23-15.27-3.05-3.75-1.37-7-.8-10.51.48C73,61.69,59.11,58.29,47.75,46c-4.94-5.36-4.53-7.21,2.36-9.9,1.87-.72,3.66-1.67,5.74-1.84,3.13-.25,3.87-2.11,2.7-4.79a42.06,42.06,0,0,1-2.41-8.94c-.78-4.12-.18-4.87,3.88-4.87a51.26,51.26,0,0,1,11.15,1.65c2.38.54,3.72,0,4-2.81A37.32,37.32,0,0,1,78.18,4c1.25-2.93,3.21-3.52,5.68-1.43,2.77,2.34,5.54,4.7,8.1,7.26,1.87,1.87,3.08,2.47,5.08,0a50,50,0,0,1,7.29-6.94c3.08-2.56,5-2.07,6.49,1.57a33.48,33.48,0,0,1,3,10.43c.2,2.62,1.35,3.45,4,2.51a36,36,0,0,1,11.5-1.79c3.2-.06,4.16,1.59,3.6,4.31a56.19,56.19,0,0,1-2.62,9.72c-1.33,3.25-.29,4.31,2.81,4.68,3.26.38,6.13,2,9,3.37,2.68,1.31,3,3.31,1.27,5.59C137.88,50.43,127.06,59.35,114.6,58.46Zm.05-4.25c5.87-.08,13.29-3,18.39-7.39,1.77-1.54,4.87-3.06,4.38-5.28s-4-2.1-6.22-2.93c-2.93-1.09-5.33-1.08-7.54,2.08a26.57,26.57,0,0,1-11,8.64c-1.71.78-5.12.55-4.76,2.67.42,2.49,3.88,1.46,5.94,2.16A3.1,3.1,0,0,0,114.65,54.21Zm-39.71,0a4.17,4.17,0,0,0,1.19-.16c1.36-.64,3.77.28,4-1.77s-2-2.18-3.39-2.82c-4.2-1.89-8.33-4.18-10.84-8-2.77-4.26-6-4-9.88-2.4-1.11.45-2.2,1-3.35,1.35-1.93.61-1.88,1.48-.63,2.83C58.25,49.93,65.67,54,74.94,54.26ZM88,28.45c.7-2.7.78-4.87,1.77-6.49,2.45-4,.92-6.87-2.13-9.46C86,11,84.51,7.86,82.62,8.41c-2.52.73-2.18,4.27-2.67,6.67-.41,2-1.86,4.34-.11,6.16C82.22,23.71,85,25.8,88,28.45Zm12.64-.8c2.86-2.14,5.39-4,7.95-5.94a2.82,2.82,0,0,0,1-2.88,40.29,40.29,0,0,0-2.09-9.38c-.45-1.2-1-2.08-2.22-.93-2.66,2.44-5.55,4.72-7.29,8-1.3,2.44,1,4.25,1.43,6.42C99.69,24.35,100.17,25.75,100.68,27.65ZM112.91,34c3-.58,5.15-1.35,7.22-1.28,3.1.09,4.74-1.07,5.33-4.07.5-2.55,3.21-5.74,1.41-7.38-2-1.81-5.53.09-8.26.95-1.93.61-4.47.89-4.61,3.71a21,21,0,0,1-1.23,6.25C112.37,33.3,112.42,34.06,112.91,34ZM65,20.76c-3-.37-4,.22-3.28,2.33s1.17,4.11,1.92,6.11c.82,2.16,10.06,5.63,12.12,4.64a1.35,1.35,0,0,0,.54-.52c.48-.86-2.55-9.85-3.56-10.19C69.85,22.16,66.89,21.33,65,20.76ZM69.54,37.6c3,5.13,10.82,9.57,15.16,8.94C81.54,40.6,76.31,38.27,69.54,37.6ZM104,46.77c5.41.12,13-4.38,15.09-9.07C112.48,38.31,107.3,40.87,104,46.77ZM89,40.86a19,19,0,0,0-8.75-13C81,33.1,82.6,37.83,89,40.86Zm19.38-12.58c-4.17,2.93-7.6,6.33-8.17,12.37C106.22,38.12,107.88,33.58,108.37,28.28Zm-13.86-4.7c-2.22,4.74-2,8.93-1.46,13.14.09.73.38,1.71,1.29,1.84s1.27-.86,1.45-1.59A20.75,20.75,0,0,0,94.51,23.58Z"
                  />
                  <path
                    fill="var(--color1)"
                    d="M283.82,58.38c-7.7-.41-14.77-2.12-21.16-6.31-2.4-1.57-2.39-2.93-1-5.25,1.52-2.49,2.82-2.06,4.82-.77,6,3.89,12.56,6,19.87,5.19A13.52,13.52,0,0,0,291,50c3-1.47,5.17-3.67,5.22-7.09,0-3.61-2.15-6.06-5.35-7.37-5.11-2.11-10.53-3.22-15.83-4.73-4.81-1.37-9.63-3-11.8-8.18C259.24,13,265.91,2,276.61.47,284-.58,291.05,0,297.7,3.68,300.41,5.19,302,6.63,300,10c-1.36,2.28-2.4,2.26-4.39.93a22,22,0,0,0-19.22-3.15c-3.8,1.12-6.48,4.3-6.46,7.85,0,3.85,2.16,6.35,5.7,7.44,5.77,1.77,11.7,3.09,17.42,5,5.28,1.77,9.62,4.71,10.76,10.86,1.1,5.94-.27,11.07-5,14.82C294.45,57.2,289.08,58.08,283.82,58.38Z"
                  />
                  <path
                    fill="var(--color1)"
                    d="M212.38,18.51c.34,5.57-.6,11.91.78,18.16S217.4,48,223.71,50.33c3.39,1.25,2.62,4,2,6-.7,2.53-2.94,1-4.41.52C212,54.06,206,45.42,205.17,34.53c-.76-9.93-.45-19.86-.7-29.78-.08-3.33,1-4.45,4.38-4.48s3.65,1.59,3.57,4.23C212.28,8.93,212.38,13.37,212.38,18.51Z"
                  />
                  <path
                    fill="var(--color1)"
                    d="M253.6,20c-.15,5.13.51,11.87-.87,18.52-1.88,9.1-6.59,15.78-15.87,18.5-1.31.38-3.27,1.5-3.76-.54s-1.5-4.82,1.46-6c8.44-3.26,11-10,11.16-18.26.21-9.39.48-18.79.52-28.19,0-2.72.71-3.84,3.63-3.79,2.7,0,3.9.7,3.78,3.63C253.46,8.78,253.6,13.62,253.6,20Z"
                  />
                  <path
                    fill="var(--color1)"
                    d="M7.85,22.17c0,6.18-.14,12.36.05,18.54C8,44.09,6,43.86,3.75,43.93S0,43.69,0,40.74Q.18,22.4,0,4.05C0,.81,1.56.36,4.24.29,7.07.22,8,1.22,7.9,4,7.73,10.07,7.85,16.12,7.85,22.17Z"
                  />
                  <path
                    fill="var(--color1)"
                    d="M173,7.37c-6.58,0-13.16-.09-19.74,0-2.83.06-3.7-1.08-3.76-3.81C149.39.71,150.8.33,153.17.34q19.94.1,39.87,0c2.73,0,3.87.85,3.83,3.7s-1.36,3.38-3.78,3.35C186.38,7.31,179.67,7.37,173,7.37Z"
                  />
                  <path
                    fill="var(--color1)"
                    d="M169.51,35.42c0-6,.11-12.08,0-18.12-.08-2.79,1.15-3.41,3.62-3.34,2.24.06,3.82.14,3.79,3.15q-.17,18.74,0,37.46c0,3-1.6,3-3.82,3.12-2.48.08-3.68-.55-3.61-3.34C169.62,48.05,169.52,41.73,169.51,35.42Z"
                  />
                  <path
                    fill="var(--color1)"
                    d="M19.65,51.14c5.52,0,11,.09,16.56,0,2.5-.06,3.25.9,3.26,3.31s-.92,3.27-3.34,3.25c-10.77-.08-21.55-.11-32.32,0C1,57.72.62,56.44.42,54.05c-.25-3,1.5-2.91,3.47-2.9H19.65Z"
                  />
                </g>
              </g>
            </svg>
          </Chakra.ModalHeader>
          <Chakra.ModalBody fontFamily={"Poppins"} color={"var(--black)"}>
            <Chakra.ModalCloseButton
              onClick={() => {
                setIsMessageSent(false);
                onClose();
              }}
              color={"var(--color1)"}
              background={"var(--color2)"}
              _hover={{ background: "var(--color1)", color: "var(--color5)" }}
            />
            {emailMutation.isSuccess && isMessageSent === true ? (
              <Chakra.Alert
                status="success"
                variant="subtle"
                justifyContent="center"
                color={"var(--black)"}
                borderRadius={"full"}
                display={"flex"}
                flexDir={"column"}
                m={"0 0 12px"}
              >
                <Chakra.Flex alignItems={"center"}>
                  <Chakra.AlertIcon boxSize="40px" mr={0} />
                  <Chakra.AlertTitle ml={"8px"} fontSize="lg">
                    Solicitud Enviada!
                  </Chakra.AlertTitle>
                </Chakra.Flex>
                <Chakra.AlertDescription
                  maxWidth="sm"
                  fontSize={"14px"}
                  textAlign={"center"}
                >
                  Pronto nos pondremos en contacto contigo.
                </Chakra.AlertDescription>
              </Chakra.Alert>
            ) : emailMutation.isError && !isMessageSent === false ? (
              <Chakra.Alert
                status="error"
                variant="subtle"
                justifyContent="center"
                color={"var(--black)"}
                borderRadius={"full"}
                display={"flex"}
                flexDir={"column"}
                m={"0 0 12px"}
              >
                <Chakra.Flex alignItems={"center"}>
                  <Chakra.AlertIcon boxSize="40px" mr={0} />
                  <Chakra.AlertTitle ml={"8px"} fontSize="lg">
                    Algo salio mal
                  </Chakra.AlertTitle>
                </Chakra.Flex>
                <Chakra.AlertDescription
                  maxWidth="sm"
                  fontSize={"14px"}
                  textAlign={"center"}
                >
                  Intenta de nuevo
                </Chakra.AlertDescription>
              </Chakra.Alert>
            ) : null}

            <form onSubmit={handleSubmit}>
              <Chakra.FormControl
                id="name"
                autocomplet="name"
                isRequired
                m={"0 0 12px"}
              >
                <Chakra.FormLabel color={"var(--color1)"}>
                  Nombre
                </Chakra.FormLabel>
                <Chakra.Input
                  placeholder="Ingresa tu nombre"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  _focusVisible={{
                    borderColor: "var(--color1)",
                  }}
                />
              </Chakra.FormControl>

              <Chakra.FormControl
                id="email"
                autocomplet="email"
                isRequired
                m={"0 0 12px"}
              >
                <Chakra.FormLabel color={"var(--color1)"}>
                  Email
                </Chakra.FormLabel>
                <Chakra.Input
                  type="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  _focusVisible={{
                    borderColor: "var(--color1)",
                  }}
                />
                <Chakra.FormHelperText></Chakra.FormHelperText>
              </Chakra.FormControl>

              <Chakra.FormControl id="message" isRequired>
                <Chakra.FormLabel color={"var(--color1)"}>
                  Mensaje
                </Chakra.FormLabel>
                <Chakra.Textarea
                  placeholder="Su Mensaje"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  _focusVisible={{
                    borderColor: "var(--color1)",
                  }}
                />
              </Chakra.FormControl>

              <Chakra.Flex justifyContent={"space-evenly"} m={"12px 0 0"}>
                {user ? (
                  <Link href="/formCreate">
                    <Chakra.Button
                      background={"var(--color2)"}
                      color={"var(--color5)"}
                      onClick={onClose}
                      _hover={{ transform: "translateY(-4px)" }}
                    >
                      Sube tu obra
                    </Chakra.Button>
                  </Link>
                ) : (
                  <>
                    <Chakra.Button
                      background={"var(--color2-3)"}
                      color={"var(--color5)"}
                      onClick={logIn.onOpen}
                      _hover={{ transform: "translateY(-4px)" }}
                    >
                      Sube tu obra
                    </Chakra.Button>

                    <Chakra.Modal
                      size="lg"
                      maxW="md"
                      isCentered
                      isOpen={logIn.isOpen}
                      onClose={logIn.onClose}
                      borderRadius={"12px"}
                    >
                      {overlay}
                      <Chakra.ModalContent
                        bg="var(--color5)"
                        fontFamily={"Poppins"}
                        color={"var(--black)"}
                      >
                        <Chakra.Alert
                          status="info"
                          variant="subtle"
                          color={"var(--black)"}
                          borderRadius={"12px 12px 0 0"}
                          m={"0 0 12px"}
                        >
                          <Chakra.AlertIcon boxSize="40px" />
                          <Chakra.AlertTitle fontSize="16px">
                            Debes iniciar sesión o crear una cuenta para
                            continuar.
                          </Chakra.AlertTitle>
                        </Chakra.Alert>
                        <Chakra.ModalCloseButton
                          background={"var(--color2)"}
                          color={"var(--color1)"}
                          _hover={{
                            background: "var(--color1)",
                            color: "var(--color2)",
                          }}
                        />

                        <Chakra.Button
                          maxW={"240px"}
                          m={"12px auto 0"}
                          _hover={{
                            bgColor: "var(--color2)",
                            transform: "translateY(-4px)",
                          }}
                          background="var(--color1)"
                          color="white"
                          onClick={SignIn.onOpen}
                        >
                          Iniciar sesión
                        </Chakra.Button>

                        <Chakra.Drawer
                          isOpen={SignIn.isOpen}
                          placement="right"
                          onClose={SignIn.onClose}
                          finalFocusRef={btnRef}
                          size="xl"
                        >
                          <Chakra.DrawerOverlay />
                          <Chakra.DrawerContent
                            bgColor="var(--color1-1)"
                            backgroundPosition="bottom"
                            bgRepeat="no-repeat"
                            bgSize="contain"
                          >
                            <Chakra.DrawerCloseButton
                              backgroundColor="var(--color1)"
                              color="var(--color3)"
                              justifyItems="center"
                              _hover={{
                                background: "var(--color3)",
                                color: "var(--color1)",
                              }}
                            />

                            <Chakra.DrawerBody
                              display="flex"
                              alignItems="center"
                              bgRepeat="no-repeat"
                              bgPosition="center bottom 80px"
                              bgSize="26%"
                            >
                              <Components.SignIn />
                            </Chakra.DrawerBody>
                          </Chakra.DrawerContent>
                        </Chakra.Drawer>

                        <Chakra.Button
                          maxW={"240px"}
                          m={"12px auto 24px"}
                          background="var(--color1)"
                          color="white"
                          _hover={{
                            bgColor: "var(--color2)",
                            transform: "translateY(-4px)",
                          }}
                          onClick={singUp.onOpen}
                        >
                          Crear cuenta
                        </Chakra.Button>
                        <Chakra.Drawer
                          isOpen={singUp.isOpen}
                          placement="right"
                          onClose={singUp.onClose}
                          finalFocusRef={btnRef}
                          size="xl"
                        >
                          <Chakra.DrawerOverlay />

                          <Chakra.DrawerContent
                            bgColor="var(--color1-1)"
                            backgroundPosition="bottom"
                            bgRepeat="no-repeat"
                            bgSize="contain"
                          >
                            <Chakra.DrawerCloseButton
                              backgroundColor="var(--color1)"
                              color="var(--color3)"
                              justifyItems="center"
                              _hover={{
                                background: "var(--color3)",
                                color: "var(--color1)",
                              }}
                            />

                            <Chakra.DrawerBody
                              bgRepeat="no-repeat"
                              bgPosition="center bottom 80px"
                              display="flex"
                              alignItems="center"
                            >
                              <Components.SignUp />
                            </Chakra.DrawerBody>
                          </Chakra.DrawerContent>
                        </Chakra.Drawer>
                      </Chakra.ModalContent>
                    </Chakra.Modal>
                  </>
                )}
                {!emailMutation.isLoading ? (
                  <Chakra.Button
                    colorScheme="lotus"
                    type="submit"
                    _hover={{ transform: "translateY(-4px)" }}
                  >
                    Enviar
                  </Chakra.Button>
                ) : (
                  <Chakra.Button
                    colorScheme="lotus"
                    type="submit"
                    cursor={"default"}
                  >
                    <Components.Loading fill={"var(--color5)"} />
                  </Chakra.Button>
                )}
              </Chakra.Flex>
            </form>
          </Chakra.ModalBody>
        </Chakra.ModalContent>
      </Chakra.Modal>
    </>
  );
};

export default ContactForm;

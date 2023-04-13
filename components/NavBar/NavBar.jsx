import Link from "next/link";
import { useRouter } from "next/router";
import * as SupaHelpers from "../../helpers/supabase_helpers/user_management";
import { FaShoppingCart } from "react-icons/fa";
import * as Chakra from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import * as Components from "../../components";
import React, { useEffect, useState } from "react";
import style from "../../styles/navBar/navBar.module.css";

import { AiFillHome } from "react-icons/ai";
import { TbPhotoHeart } from "react-icons/tb";

function NavBar({
  classname,
  avatarImage = "https://bit.ly/dan-abramov",
  ...props
}) {
  const tabIndex = { home: 0, artworks: 1, cart: 2 };

  const router = useRouter();

  const SignIn = Chakra.useDisclosure();
  const singUp = Chakra.useDisclosure();
  const btnRef = React.useRef();

  const [logged, setLogged] = useState(false);

  const loguearse = async () => {
    let data = await SupaHelpers.loggedStatus();
    setLogged(data);
  };

  useEffect(() => {
    loguearse();
  }, []);

  const [userData, setUserData] = useState("");

  const datosUsuario = async () => {
    let user = await SupaHelpers.getUserName();
    setUserData(user);
  };
  useEffect(() => {
    datosUsuario();
    console.log("userData", userData);
  }, []);

  const [userData2, setUserData2] = useState(null);

  const datosUsuario2 = async () => {
    let users = await SupaHelpers.getUser();
    setUserData2(users);
  };
  useEffect(() => {
    datosUsuario2();
  }, []);

  // function handleTabsIndex() {
  //   let property = router.pathname.substring(1);

  //   if (!property) {
  //     return tabIndex["home"];
  //   }

  //   return tabIndex[property];
  // }

  const [isLargerThan520] = Chakra.useMediaQuery("(min-width: 520px)");
  const [isLargerThan730] = Chakra.useMediaQuery("(min-width: 730px)");
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "var(--color4)",
        padding: "16px 12px",
        fontFamily: "Poppins",
        position:"sticky",
        top: "0",
        zIndex:"10"
      }}
      {...props}
    >
      <Chakra.Box w={"100%"} maxW="1400px" margin="auto">
            {isLargerThan520 ? (
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <Link href={"/"}>
                  <svg
                    className={style.navLogo}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100.06 57.39"
                  >
                    <title>Recurso 2</title>
                    <g id="Capa_2" data-name="Capa 2">
                      <g id="Capa_1-2" data-name="Capa 1">
                        <path d="M70.16,57.2c-5.11.63-10.25-1.22-15.26-3-3.76-1.37-7-.8-10.52.48C28.58,60.43,14.68,57,3.31,44.7c-4.93-5.36-4.52-7.22,2.37-9.9,1.86-.73,3.65-1.68,5.74-1.85,3.13-.25,3.86-2.1,2.7-4.78a41.63,41.63,0,0,1-2.41-8.94c-.79-4.12-.18-4.87,3.88-4.87A50.57,50.57,0,0,1,26.73,16c2.39.54,3.72,0,4-2.81a36.72,36.72,0,0,1,3-10.45C35-.17,37-.77,39.42,1.32,42.19,3.67,45,6,47.53,8.59c1.86,1.87,3.07,2.47,5.07,0a51,51,0,0,1,7.29-6.94C63-1,64.85-.47,66.39,3.18a33.14,33.14,0,0,1,3,10.42c.2,2.63,1.36,3.46,4,2.52a36,36,0,0,1,11.5-1.79c3.2-.06,4.17,1.59,3.6,4.31a55.2,55.2,0,0,1-2.62,9.71c-1.33,3.25-.28,4.31,2.82,4.68s6.13,2,9,3.38c2.69,1.31,3,3.31,1.28,5.59C93.44,49.18,82.63,58.09,70.16,57.2Zm0-4.24c5.88-.08,13.29-3,18.39-7.39C90.37,44,93.47,42.5,93,40.29s-4-2.11-6.22-2.93c-2.93-1.09-5.34-1.08-7.54,2.08a26.63,26.63,0,0,1-11,8.64c-1.71.78-5.13.55-4.76,2.67.42,2.49,3.87,1.46,5.94,2.15A3,3,0,0,0,70.21,53Zm-39.7,0a3.74,3.74,0,0,0,1.18-.17c1.36-.64,3.78.28,4-1.77s-2-2.18-3.4-2.82c-4.2-1.88-8.32-4.17-10.83-8-2.78-4.26-6-4-9.88-2.41-1.12.46-2.21,1-3.35,1.36-1.94.6-1.88,1.48-.64,2.82C13.82,48.68,21.24,52.75,30.51,53ZM43.61,27.2c.69-2.7.77-4.88,1.76-6.5,2.46-4,.92-6.86-2.13-9.46-1.71-1.45-3.17-4.64-5.06-4.09-2.52.74-2.17,4.28-2.67,6.68-.4,2-1.85,4.33-.1,6.16C37.79,22.46,40.56,24.55,43.61,27.2Zm12.64-.8c2.86-2.14,5.39-4.06,8-5.94a2.81,2.81,0,0,0,1-2.88A39.78,39.78,0,0,0,63.09,8.2c-.45-1.21-1-2.08-2.21-.93-2.66,2.44-5.56,4.71-7.29,8-1.31,2.43,1,4.25,1.42,6.42C55.26,23.1,55.74,24.5,56.25,26.4Zm12.22,6.37c3-.58,5.15-1.35,7.23-1.29,3.1.09,4.73-1.06,5.33-4.07.5-2.54,3.21-5.73,1.4-7.37-2-1.81-5.52.08-8.25.94-1.94.62-4.48.89-4.62,3.71A21.08,21.08,0,0,1,68.34,31C67.93,32.05,68,32.8,68.47,32.77ZM20.58,19.51c-3-.38-4,.22-3.28,2.33s1.17,4.11,1.93,6.1c.82,2.17,10.06,5.64,12.11,4.65a1.23,1.23,0,0,0,.54-.52c.48-.87-2.55-9.86-3.56-10.19C25.41,20.91,22.46,20.08,20.58,19.51Zm4.53,16.83c3,5.14,10.82,9.58,15.16,8.95C37.1,39.34,31.87,37,25.11,36.34Zm34.45,9.18c5.41.12,13-4.38,15.1-9.07C68,37.06,62.87,39.62,59.56,45.52Zm-15-5.92a19,19,0,0,0-8.75-13C36.56,31.85,38.16,36.58,44.55,39.6ZM63.94,27C59.76,30,56.33,33.36,55.77,39.4,61.78,36.87,63.44,32.32,63.94,27ZM50.08,22.32c-2.23,4.74-2,8.94-1.47,13.15.1.73.39,1.71,1.3,1.83s1.26-.86,1.44-1.59A20.75,20.75,0,0,0,50.08,22.32Z" />
                      </g>
                    </g>
                  </svg>
                </Link>

                <Link href={"/"}>
                  <Chakra.Button
                    borderRadius={"100px"}
                    w={"100%"}
                    fontSize={"16px"}
                    maxW={"330px"}
                    id="home"
                    margin={"0 4px"}
                    background="var(--color3)"
                    color="var(--black)"
                    _hover={{
                      background: "var(--color1)",
                      color: "var(--color5)",
                      transform: "translateY(-4px)",
                    }}
                    _focus={{
                      background: "var(--color1)",
                      color: "var(--color5)",
                      transform: "translateY(-4px)",
                    }}
                  >
                    <div style={{ margin: "0 4px", fontSize:"18px"}}>
                      <AiFillHome />
                    </div>
                    {isLargerThan730 && "Home"}
                  </Chakra.Button>
                </Link>

                <Link href={"/artworks"}>
                  <Chakra.Button
                    borderRadius={"100px"}
                    w={"100%"}
                    fontSize={"16px"}
                    maxW={"330px"}
                    id="home"
                    margin={"0 4px"}
                    background="var(--color3)"
                    color="var(--black)"
                    _hover={{
                      background: "var(--color1)",
                      color: "var(--color5)",
                      transform: "translateY(-4px)",
                    }}
                    _focus={{
                      background: "var(--color1)",
                      color: "var(--color5)",
                      transform: "translateY(-4px)",
                    }}
                  >
                    <div style={{ margin: "0 4px", fontSize:"20px" }}>
                      <TbPhotoHeart />
                    </div>
                    {isLargerThan730 && "Cuadros"}
                  </Chakra.Button>
                </Link>

                <Link href={"/cart"}>
                  <Chakra.Button
                    borderRadius={"100px"}
                    w={"100%"}
                    fontSize={"16px"}
                    maxW={"330px"}
                    id="home"
                    margin={"0 4px"}
                    background="var(--color3)"
                    color="var(--black)"
                    _hover={{
                      background: "var(--color1)",
                      color: "var(--color5)",
                      transform: "translateY(-4px)",
                    }}
                    _focus={{
                      background: "var(--color1)",
                      color: "var(--color5)",
                      transform: "translateY(-4px)",
                    }}
                  >
                    <Chakra.Icon as={FaShoppingCart}m={"0 4px"}/>
                    {isLargerThan730 && `Carrito`}
                  </Chakra.Button>
                </Link>

                {logged == true ? (
                  <div className="logedContainer">
                    <Chakra.ButtonGroup>
                      <Chakra.Box>
                        <Chakra.Menu>
                          <Chakra.MenuButton
                            as={Chakra.Button}
                            rounded={"full"}
                            variant={"link"}
                            cursor={"pointer"}
                            // minW={0}
                          >
                            <Chakra.Center marginLeft="12px">
                              <Chakra.Avatar
                                w="40px"
                                h="40px"
                                src={avatarImage}
                                bg="purple"
                                transition={"transform .2s"}
                                sx={{
                                  ".logedContainer:hover &": {
                                    transform: "translateY(-4px)",
                                  },
                                }}
                              >
                                <Chakra.AvatarBadge
                                  boxSize="1.25em"
                                  bg="green.500"
                                />
                              </Chakra.Avatar>
                            </Chakra.Center>
                          </Chakra.MenuButton>
                          <Chakra.MenuList alignItems={"center"}>
                            <br />
                            <Chakra.Center>
                              <Chakra.Avatar
                                size={"2xl"}
                                src={avatarImage}
                                bg="purple"
                              />
                            </Chakra.Center>
                            <br />
                            <Chakra.Center>
                              <p>
                                {
                                  logged && userData2?.user_metadata?.name // mostrar el nombre de usuario de Google si se inicia sesión con Google
                                    ? userData2.user_metadata.name
                                    : userData // mostrar el nombre de usuario si se inicia sesión en tu sitio web
                                }
                              </p>
                            </Chakra.Center>

                            <br />
                            <Chakra.MenuDivider />
                            <Chakra.MenuItem>
                              <Link href="/profile">Profile</Link>
                            </Chakra.MenuItem>
                            <Chakra.MenuItem>Account Settings</Chakra.MenuItem>
                            <Chakra.Flex align={"center"} justify={"center"}>
                              <Components.LogOutButton />
                            </Chakra.Flex>
                          </Chakra.MenuList>
                        </Chakra.Menu>
                      </Chakra.Box>
                    </Chakra.ButtonGroup>
                  </div>
                ) : (
                  <Chakra.Box width={"100%"} display={"flex"} justifyContent={"space-between"} ml={"8px"}>
                    <Chakra.Button
                      onClick={singUp.onOpen}
                      margin={"0 4px"}
                      borderRadius="100px"
                      bgColor="var(--color1)"
                      style={{ color: "var(--white)" }}
                      _hover={{
                        bgColor: "var(--color2)",
                        transform: "translateY(-4px)",
                      }}
                      color={router.pathname === "/search" ? "black" : "black"}
                      solid="true"
                      className={style.button}
                      // ml="30px"
                      // mr="30px"
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

                    <Chakra.Button
                      onClick={SignIn.onOpen}
                      margin={"0 4px"}
                      borderRadius="100px"
                      bgColor="var(--color1)"
                      style={{ color: "var(--white)" }}
                      _hover={{
                        bgColor: "var(--color2)",
                        transform: "translateY(-4px)",
                      }}
                      color={router.pathname === "/search" ? "black" : "black"}
                      solid="true"
                      borderColor="black"
                      className={style.button}
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
                  </Chakra.Box>
                )}
              </div>
            ) : (
              <div className={style.nav_560}>
                <Link href={"/"}>
                  <svg
                    className={style.navLogo}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100.06 57.39"
                  >
                    <title>Recurso 2</title>
                    <g id="Capa_2" data-name="Capa 2">
                      <g id="Capa_1-2" data-name="Capa 1">
                        <path d="M70.16,57.2c-5.11.63-10.25-1.22-15.26-3-3.76-1.37-7-.8-10.52.48C28.58,60.43,14.68,57,3.31,44.7c-4.93-5.36-4.52-7.22,2.37-9.9,1.86-.73,3.65-1.68,5.74-1.85,3.13-.25,3.86-2.1,2.7-4.78a41.63,41.63,0,0,1-2.41-8.94c-.79-4.12-.18-4.87,3.88-4.87A50.57,50.57,0,0,1,26.73,16c2.39.54,3.72,0,4-2.81a36.72,36.72,0,0,1,3-10.45C35-.17,37-.77,39.42,1.32,42.19,3.67,45,6,47.53,8.59c1.86,1.87,3.07,2.47,5.07,0a51,51,0,0,1,7.29-6.94C63-1,64.85-.47,66.39,3.18a33.14,33.14,0,0,1,3,10.42c.2,2.63,1.36,3.46,4,2.52a36,36,0,0,1,11.5-1.79c3.2-.06,4.17,1.59,3.6,4.31a55.2,55.2,0,0,1-2.62,9.71c-1.33,3.25-.28,4.31,2.82,4.68s6.13,2,9,3.38c2.69,1.31,3,3.31,1.28,5.59C93.44,49.18,82.63,58.09,70.16,57.2Zm0-4.24c5.88-.08,13.29-3,18.39-7.39C90.37,44,93.47,42.5,93,40.29s-4-2.11-6.22-2.93c-2.93-1.09-5.34-1.08-7.54,2.08a26.63,26.63,0,0,1-11,8.64c-1.71.78-5.13.55-4.76,2.67.42,2.49,3.87,1.46,5.94,2.15A3,3,0,0,0,70.21,53Zm-39.7,0a3.74,3.74,0,0,0,1.18-.17c1.36-.64,3.78.28,4-1.77s-2-2.18-3.4-2.82c-4.2-1.88-8.32-4.17-10.83-8-2.78-4.26-6-4-9.88-2.41-1.12.46-2.21,1-3.35,1.36-1.94.6-1.88,1.48-.64,2.82C13.82,48.68,21.24,52.75,30.51,53ZM43.61,27.2c.69-2.7.77-4.88,1.76-6.5,2.46-4,.92-6.86-2.13-9.46-1.71-1.45-3.17-4.64-5.06-4.09-2.52.74-2.17,4.28-2.67,6.68-.4,2-1.85,4.33-.1,6.16C37.79,22.46,40.56,24.55,43.61,27.2Zm12.64-.8c2.86-2.14,5.39-4.06,8-5.94a2.81,2.81,0,0,0,1-2.88A39.78,39.78,0,0,0,63.09,8.2c-.45-1.21-1-2.08-2.21-.93-2.66,2.44-5.56,4.71-7.29,8-1.31,2.43,1,4.25,1.42,6.42C55.26,23.1,55.74,24.5,56.25,26.4Zm12.22,6.37c3-.58,5.15-1.35,7.23-1.29,3.1.09,4.73-1.06,5.33-4.07.5-2.54,3.21-5.73,1.4-7.37-2-1.81-5.52.08-8.25.94-1.94.62-4.48.89-4.62,3.71A21.08,21.08,0,0,1,68.34,31C67.93,32.05,68,32.8,68.47,32.77ZM20.58,19.51c-3-.38-4,.22-3.28,2.33s1.17,4.11,1.93,6.1c.82,2.17,10.06,5.64,12.11,4.65a1.23,1.23,0,0,0,.54-.52c.48-.87-2.55-9.86-3.56-10.19C25.41,20.91,22.46,20.08,20.58,19.51Zm4.53,16.83c3,5.14,10.82,9.58,15.16,8.95C37.1,39.34,31.87,37,25.11,36.34Zm34.45,9.18c5.41.12,13-4.38,15.1-9.07C68,37.06,62.87,39.62,59.56,45.52Zm-15-5.92a19,19,0,0,0-8.75-13C36.56,31.85,38.16,36.58,44.55,39.6ZM63.94,27C59.76,30,56.33,33.36,55.77,39.4,61.78,36.87,63.44,32.32,63.94,27ZM50.08,22.32c-2.23,4.74-2,8.94-1.47,13.15.1.73.39,1.71,1.3,1.83s1.26-.86,1.44-1.59A20.75,20.75,0,0,0,50.08,22.32Z" />
                      </g>
                    </g>
                  </svg>
                </Link>
                <HamburgerIcon boxSize={"38px"} color={"var(--color1)"} />
              </div>
            )}
      </Chakra.Box>
    </div>
  );
}

export default NavBar;

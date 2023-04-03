import Link from "next/link";
import { useRouter } from "next/router";
import { FaShoppingCart } from "react-icons/fa";
import * as Chakra from "@chakra-ui/react";
import React from "react";
import * as Layouts from "../../layouts";
import * as Components from "../../components";

function NavBar({ artworks, techniques, categories, supports, classname, ...props }) {
  const router = useRouter();

  const SignIn = Chakra.useDisclosure();
  const singUp = Chakra.useDisclosure();
  const btnRef = React.useRef();

  return (
    <div style={{ width: "100%", backgroundColor: "#F8EAD8", padding: "5px" }}>
      <Chakra.Box maxW="1700px" margin="auto" pt="20px">
        <Chakra.Tabs isFitted variant="solid-rounded" colorScheme="teal">
          <Chakra.TabList
            mb="2em"
            bgRepeat="no-repeat"
            height="10"
            bgPos="initial"
            pr="80px"
            variant="solid"
            borderColor="#F8EAD8"
          >
            <img src="/lotusIsotipo.svg" style={{ marginRight: "30px" }} />

            <Chakra.Tab id="home" borderColor="#A7727D">
              Home
            </Chakra.Tab>

            <Chakra.Tab id="artworks" borderColor="#A7727D">
              Cuadros
            </Chakra.Tab>

            <Chakra.Tab id="cart" borderColor="#A7727D">
              {" "}
              Carrito <Chakra.Icon as={FaShoppingCart} ml={2} color="red.500" />
            </Chakra.Tab>
            <Chakra.Button
              onClick={singUp.onOpen}
              bgColor="#F9F5E7"
              _hover={{ bgColor: "#D3C0AF" }}
              color={router.pathname === "/search" ? "black" : "black"}
              borderRadius="0px"
              border="2px"
              solid="true"
              borderColor="black"
              ml="30px"
              mr="30px"
            >
              Crea tu cuenta
            </Chakra.Button>

            <Chakra.Drawer
              isOpen={singUp.isOpen}
              placement="right"
              onClose={singUp.onClose}
              finalFocusRef={btnRef}
              size="xl"
            >
              <Chakra.DrawerContent
                bgColor="#F9F5E7"
                backgroundPosition="bottom"
                bgRepeat="no-repeat"
                bgSize="contain"
              >
                <Chakra.DrawerCloseButton
                  backgroundColor="#F9F5E7"
                  color="red"
                  justifyItems="center"
                />

                <Chakra.DrawerBody
                  bgRepeat="no-repeat"
                  bgPosition="center bottom 80px"
                  bgSize="26%"
                >
                  <Components.SignUp bgColor="#F9F5E7" />
                </Chakra.DrawerBody>
              </Chakra.DrawerContent>
            </Chakra.Drawer>

            <Chakra.Button
              onClick={SignIn.onOpen}
              bgColor="#F9F5E7"
              _hover={{ bgColor: "#D3C0AF" }}
              color={router.pathname === "/search" ? "black" : "black"}
              borderRadius="0px"
              border="2px"
              solid="true"
              borderColor="black"
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
              <Chakra.DrawerContent
                bgColor="#F9F5E7"
                backgroundPosition="bottom"
                bgRepeat="no-repeat"
                bgSize="contain"
              >
                <Chakra.DrawerCloseButton
                  backgroundColor="#F9F5E7"
                  color="red"
                  justifyItems="center"
                />

                <Chakra.DrawerBody
                  bgRepeat="no-repeat"
                  bgPosition="center bottom 80px"
                  bgSize="26%"
                >
                  <Components.SignIn bgColor="#F9F5E7" />
                </Chakra.DrawerBody>
              </Chakra.DrawerContent>
            </Chakra.Drawer>
          </Chakra.TabList>
          <Components.SearchBar margin={"auto"} />
          <Chakra.TabPanels>
            <Chakra.TabPanel id="home">
              <Layouts.Home artworks={artworks} />
            </Chakra.TabPanel>

            <Chakra.TabPanel id="artworks">
              <Layouts.Artworks
                artworks={artworks}
                techniques={techniques}
                categories={categories}
                supports={supports}
              />
            </Chakra.TabPanel>

            <Chakra.TabPanel id="cart">
              <p>Carrito!</p>
            </Chakra.TabPanel>
          </Chakra.TabPanels>
        </Chakra.Tabs>
      </Chakra.Box>
    </div>
  );
}

export default NavBar;

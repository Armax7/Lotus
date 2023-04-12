import style from "./Footer.module.css";
import * as Chakra from "@chakra-ui/react";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import * as Components from "../../components"

function Footer() {
  return (
    <Chakra.Box
      as="footer"
      py="4"
      padding="22px"
      background="var(--color1)"
      color="var(--color5)"
      fontFamily={"Poppins"}
      fontSize={"12px"}
    >
      <Chakra.Flex
        maxW={"1400px"}
        m="auto"
        justifyContent="space-between"
        flexWrap="wrap"
        cursor={"default"}
        textAlign="center"
      >
        <Chakra.Box minW="250px" textAlign="center" m="18px auto">
          <Chakra.Box>
            <hr className={style.hr} />
            <Chakra.Text fontSize="xl" fontWeight="bold">
              Ubicación
            </Chakra.Text>
            <Chakra.Text _hover={{ color: "var(--color3)" }} mt={"4px"}>
              Calle-00, Santiago, Metropolitana, Chile
            </Chakra.Text>
          </Chakra.Box>
        </Chakra.Box>

        <Chakra.Box minW="250px" textAlign="center" m="18px auto">
          <Chakra.Box>
            <hr className={style.hr} />
            <Chakra.Text fontSize="xl" fontWeight="bold"  mb={"4px"}>
              Conócenos
            </Chakra.Text>
            <Components.AboutUs />
          </Chakra.Box>
        </Chakra.Box>

        <Chakra.Box minW="250px" textAlign="center" m="18px auto">
          <Chakra.List mb="2">
            <hr className={style.hr} />
            <Chakra.Text fontSize="xl" fontWeight="bold">
              Información
            </Chakra.Text>
            <Chakra.ListItem>
              <Chakra.Text _hover={{ color: "var(--color3)" }} mt={"4px"}>
                Contacto
              </Chakra.Text>
            </Chakra.ListItem>
            <Chakra.ListItem>
              <Chakra.Text _hover={{ color: "var(--color3)" }} mt={"4px"}>
                Términos y condiciones
              </Chakra.Text>
            </Chakra.ListItem>
          </Chakra.List>
        </Chakra.Box>

        <Chakra.Box minW="250px" textAlign="center" m="18px auto">
          <hr className={style.hr} />
          <Chakra.Text
            fontSize="xl"
            fontWeight="bold"
            _hover={{ color: "var(--color3)" }}
          >
            &copy; 2023, Lotus
          </Chakra.Text>
        </Chakra.Box>

        <Chakra.Box minW="250px" textAlign="center" m="18px auto">
          <hr className={style.hr} />
          <Chakra.Text fontSize="xl" fontWeight="bold">
            Redes Sociales
          </Chakra.Text>
          <Chakra.Flex padding={"20px"} justifyContent={"space-evenly"}>
            <a
              href="https://www.facebook.com/galeriadeartesolidario"
              target="_blank"
              className={style.smIcons}
            >
              <BsFacebook />
            </a>
            <a
              href="https://www.instagram.com/galeriadeartelotus/"
              target="_blank"
              className={style.smIcons}
            >
              <BsInstagram />
            </a>
          </Chakra.Flex>
        </Chakra.Box>
      </Chakra.Flex>
    </Chakra.Box>
  );
}

export default Footer;

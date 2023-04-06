import style from "./Footer.module.css";
import * as Chakra from "@chakra-ui/react";
import { BsFacebook, BsInstagram } from "react-icons/bs";

function Footer() {
  return (
    <Chakra.Box
      as="footer"
      py="4"
      padding="22px"
      background="var(--color1)"
      color="#F9F5E7"
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
          <Chakra.Box mb="2">
            <hr className={style.hr} />
            <Chakra.Text fontSize="xl" fontWeight="bold">
              Ubicación
            </Chakra.Text>
            <Chakra.Text _hover={{ color: "var(--color3)" }}>
              Calle-00, Santiago, Metropolitana, Chile
            </Chakra.Text>
          </Chakra.Box>
        </Chakra.Box>

        <Chakra.Box minW="250px" textAlign="center" m="18px auto">
          <Chakra.Box>
            <hr className={style.hr} />
            <Chakra.Text fontSize="xl" fontWeight="bold" mb="2">
              Numero de contacto
            </Chakra.Text>
            <Chakra.Text _hover={{ color: "var(--color3)" }}>
              +00 000 000 00 00
            </Chakra.Text>
          </Chakra.Box>
        </Chakra.Box>

        <Chakra.Box minW="250px" textAlign="center" m="18px auto">
          <Chakra.List spacing="2" mb="2">
            <hr className={style.hr} />
            <Chakra.Text fontSize="xl" fontWeight="bold" mb="2">
              Información
            </Chakra.Text>
            <Chakra.ListItem>
              <Chakra.Text _hover={{ color: "var(--color3)" }}>
                Contacto
              </Chakra.Text>
            </Chakra.ListItem>
            <Chakra.ListItem>
              <Chakra.Text _hover={{ color: "var(--color3)" }}>
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
          <Chakra.Text 
            fontSize="xl"
            fontWeight="bold">
            Redes Sociales
          </Chakra.Text>
          <Chakra.Flex padding={"20px"} justifyContent={"space-evenly"}>
            <a href="https://www.facebook.com/galeriadeartesolidario" className={style.smIcons}>
              <BsFacebook />
            </a>
            <a href="https://www.instagram.com/galeriadeartelotus/" className={style.smIcons}>
              <BsInstagram />
            </a>
          </Chakra.Flex>
        </Chakra.Box>
      </Chakra.Flex>
    </Chakra.Box>
  );
}

export default Footer;

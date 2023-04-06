import * as Chakra from "@chakra-ui/react";
import { BsFacebook, BsInstagram} from "react-icons/bs";

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
        margin="auto"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Chakra.Box minW="300px" textAlign="center" margin="auto">
          <Chakra.Box mb="2">
            <hr />
            <Chakra.Text fontSize="xl" fontWeight="bold">
              Ubicación
            </Chakra.Text>
            <Chakra.Text _hover={{ color: "#EDDBC7" }}>
              Store Address, Santiago, Metropolitana, Chile
            </Chakra.Text>
          </Chakra.Box>

          <Chakra.Box>
            <hr />
            <Chakra.Text fontSize="xl" fontWeight="bold" mb="2">
              Número de contacto
            </Chakra.Text>
            <Chakra.Text _hover={{ color: "#EDDBC7" }}>2604224940</Chakra.Text>
          </Chakra.Box>
        </Chakra.Box>

        <Chakra.Box minW="300px" textAlign="center" margin="auto">
          <Chakra.List spacing="2" mb="2">
            <hr />
            <Chakra.Text fontSize="xl" fontWeight="bold" mb="2">
              Información
            </Chakra.Text>
            <Chakra.ListItem>
              <Chakra.Text _hover={{ color: "#EDDBC7" }}>Contacto</Chakra.Text>
            </Chakra.ListItem>
            <Chakra.ListItem>
              <Chakra.Text _hover={{ color: "#EDDBC7" }}>
                Términos y condiciones
              </Chakra.Text>
            </Chakra.ListItem>
          </Chakra.List>
        </Chakra.Box>

        <Chakra.Box minW="300px" textAlign="center" margin="auto">

          <hr />
          <Chakra.Text
            fontSize="xl"
            fontWeight="bold"
            _hover={{ color: "#EDDBC7" }}

          >
            &copy; 2023, Lotus
            <Chakra.Box textAlign="center" margin="auto">
            <a href="https://www.facebook.com/galeriadeartesolidario">
              <Chakra.Link >
                <BsFacebook />
              </Chakra.Link>
            </a>
            </Chakra.Box>
            <br />
            <Chakra.Box textAlign="center" margin="auto">
            <a href="https://www.instagram.com/galeriadeartelotus/">
              <Chakra.Link>
                <BsInstagram />
              </Chakra.Link>
            </a>
            </Chakra.Box>
            <br />
            
            
            
            
          </Chakra.Text>
        </Chakra.Box>
      </Chakra.Flex>
    </Chakra.Box>
  );
}

export default Footer;

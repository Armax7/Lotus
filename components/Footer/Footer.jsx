import * as Chakra from "@chakra-ui/react"

 

function Footer() {
    return (
      <Chakra.Box as="footer" py="4" bg="gray.200">
        <Chakra.Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Chakra.Box flex="1 1 300px" pr="8" mb={{ base: "4", md: "0" }}>
            <Chakra.Box mb="2">
              <Chakra.Text fontSize="xl" fontWeight="bold">Ubicación</Chakra.Text>
              <Chakra.Text>Store Address, Santiago, Metropolitana, Chile</Chakra.Text>
            </Chakra.Box>
            <Chakra.Box>
              <Chakra.Text fontSize="xl" fontWeight="bold" mb="2">Número de contacto</Chakra.Text>
              <Chakra.Text>2604224940</Chakra.Text>
            </Chakra.Box>
          </Chakra.Box>
          <Chakra.Box flex="1 1 300px" mb={{ base: "4", md: "0" }}>
            <Chakra.List spacing="2" mb="2">
              <Chakra.Text fontSize="xl" fontWeight="bold" mb="2">Información</Chakra.Text>
              <Chakra.ListItem>
                <Chakra.Text>Contacto</Chakra.Text> 
              </Chakra.ListItem>
              <Chakra.ListItem>
                <Chakra.Text>Términos y condiciones</Chakra.Text> 
              </Chakra.ListItem>
            </Chakra.List>
          </Chakra.Box>
          <Chakra.Box flex="1 1 300px" textAlign={{ base: "center", md: "right" }}>
            <Chakra.Text fontSize="xl" fontWeight="bold" mb="2">&copy; 2023, Lotus</Chakra.Text>
          </Chakra.Box>
        </Chakra.Flex>
      </Chakra.Box>
    );
  }

export default Footer
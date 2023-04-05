import * as Chakra from "@chakra-ui/react";

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
        margin="auto"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        cursor={"default"}
      >
        <Chakra.Box minW="300px" textAlign="center" margin="auto">
          <Chakra.Box mb="2">
            <hr />
            <Chakra.Text fontSize="xl" fontWeight="bold">
              Ubication
            </Chakra.Text>
            <Chakra.Text _hover={{ color: "var(--color3)" }}>
              Store Address, Santiago, Metropolitana, Chile
            </Chakra.Text>
          </Chakra.Box>

          <Chakra.Box>
            <hr />
            <Chakra.Text fontSize="xl" fontWeight="bold" mb="2">
              Contact number
            </Chakra.Text>
            <Chakra.Text _hover={{ color: "var(--color3)" }}>+12 345 678 90 12</Chakra.Text>
          </Chakra.Box>
        </Chakra.Box>

        <Chakra.Box minW="300px" textAlign="center" margin="auto">
          <Chakra.List spacing="2" mb="2">
            <hr />
            <Chakra.Text fontSize="xl" fontWeight="bold" mb="2">
              Information
            </Chakra.Text>
            <Chakra.ListItem>
              <Chakra.Text _hover={{ color: "var(--color3)" }}>Contact</Chakra.Text>
            </Chakra.ListItem>
            <Chakra.ListItem>
              <Chakra.Text _hover={{ color: "var(--color3)" }}>
                Termns y Conditions
              </Chakra.Text>
            </Chakra.ListItem>
          </Chakra.List>
        </Chakra.Box>

        <Chakra.Box minW="300px" textAlign="center" margin="auto">
          <hr />
          <Chakra.Text
            fontSize="xl"
            fontWeight="bold"
            _hover={{ color: "var(--color3)" }}
          >
            &copy; 2023, Lotus
          </Chakra.Text>
        </Chakra.Box>
      </Chakra.Flex>
    </Chakra.Box>
  );
}

export default Footer;

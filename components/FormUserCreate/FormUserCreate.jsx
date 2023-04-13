import * as Chakra from "@chakra-ui/react";

function FormUserCreate() {
  return (
    <form>
      <Chakra.HStack>
        <Chakra.Flex
          w="full"
          h="full"
          alignItems="center"
          justifyContent="center"
        >
          <Chakra.Stack>
            <Chakra.Box>
              <Chakra.Heading fontSize="2xl">
                Envíe su propia obra
              </Chakra.Heading>
              <Chakra.Divider />
              <Chakra.FormControl>
                <Chakra.FormLabel>Nombre de la obra</Chakra.FormLabel>
                <Chakra.Input placeholder="nombre..." />
              </Chakra.FormControl>
              <Chakra.FormControl>
                <Chakra.FormLabel>Imágen de la obra</Chakra.FormLabel>
                <Chakra.Input placeholder="nombre..." />
              </Chakra.FormControl>
              <Chakra.FormControl>
                <Chakra.FormLabel>Tamaño</Chakra.FormLabel>
                <Chakra.Input placeholder="50X70cm..." />
              </Chakra.FormControl>
              <Chakra.FormControl>
                <Chakra.FormLabel>Cantidad de ejemplares disponibles</Chakra.FormLabel>
                <Chakra.Input placeholder="8" /> unidades
              </Chakra.FormControl>
              <Chakra.FormControl>
                <Chakra.FormLabel>Técnicas utilizadas</Chakra.FormLabel>
                <Chakra.Input placeholder="nombre..." />
              </Chakra.FormControl>
              <Chakra.FormControl>
                <Chakra.FormLabel>Categorías</Chakra.FormLabel>
                <h2>checkbox</h2>
              </Chakra.FormControl>
              <Chakra.FormControl>
                <Chakra.FormLabel>Soporte de la obra</Chakra.FormLabel>
                <h2>checkbox</h2>
              </Chakra.FormControl>
            </Chakra.Box>
            <Chakra.FormControl>
                <Chakra.FormLabel>Nombre del autor</Chakra.FormLabel>
                <Chakra.Input placeholder="nombre..." />
              </Chakra.FormControl>
              <Chakra.FormControl>
                <Chakra.FormLabel>Descripción de la obra</Chakra.FormLabel>
                <Chakra.Input placeholder="descripción..." />
              </Chakra.FormControl>
          </Chakra.Stack>
          <Chakra.FormControl>
                <Chakra.FormLabel>Precio sugerido</Chakra.FormLabel>
                <Chakra.Input placeholder="precio..." /> USD
              </Chakra.FormControl>
        </Chakra.Flex>
      </Chakra.HStack>
    </form>
  );
}

export default FormUserCreate;

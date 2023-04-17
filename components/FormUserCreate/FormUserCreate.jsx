import { useState } from "react";
import * as Chakra from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import * as Components from "../../components";
import * as ReactQuery from "@tanstack/react-query";
import * as QueryFns from "../../helpers/page_helpers/Home_helpers/query_fn";
import * as QueryKeys from "../../helpers/page_helpers/Home_helpers/query_keys";

function validateFormCreate(input) {
  const error = {};
  if (!input.name || isNaN(input.name) === false) {
    error.name = "Todas las obras requieren un nombre";
  }
  if (!input.stock) {
    error.stock = "Deben estar disponible una o más unidades";
  }
  if (!input.image) {
    error.image = "Debe seleccionar una o más imágenes";
  }
  if (!input.size) {
    error.size = "Debe indicar las medidas de la obra";
  }
  if (!input.price) {
    error.size = "Debe indicar un monto sugerido";
  }
  if (!input.techniques) {
    error.techniques = "Debe seleccionar una o más técnicas";
  }
  if (!input.categories) {
    error.categories = "Debe seleccionar una o más categorías";
  }
  if (!input.supports) {
    error.supports = "Debe seleccionar un soporte";
  }
  return error;
}

function FormUserCreate() {
  const optionsMOCK = ["option1", "option2", "option3"];

  const techniques = ReactQuery.useQuery(
    [QueryKeys.QK_TECHNIQUES],
    QueryFns.getTechniquesAxios
  );

  const categories = ReactQuery.useQuery(
    [QueryKeys.QK_CATEGORIES],
    QueryFns.getCategoriesAxios
  );

  const supports = ReactQuery.useQuery(
    [QueryKeys.QK_SUPPORTS],
    QueryFns.getSupportsAxios
  );
  console.log(supports.data + "const de supports");

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    stock: "",
    image: "",
    size: "",
    price: "",
    techniques: [],
    categories: [],
    supports: "",
  });

  function handleInputOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
    setErrors(
      validateFormCreate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(el) {
    el.preventDefault();
    console.log(input);
    setErrors(validateFormCreate(input));
    const horrores = validateFormCreate(input);
    if (Object.values(horrores).length !== 0) {
      alert("Por favor complete todos los campos obligatorios");
    } else {
    }
  }

  return (
    <form onSubmit={(el) => handleSubmit(el)}>
      <Chakra.HStack>
        <Chakra.Flex
          w="100%"
          alignItems="center"
          justifyContent="center"
          fontFamily={"Poppins"}
        >
          <Chakra.Stack w="full" maxW="md" spacing={4} p={6}>
            <Chakra.Box>
              <Chakra.Heading fontSize="2xl" mt={3}>
                Envíe su propia obra
              </Chakra.Heading>
              <Chakra.Divider />
              <Chakra.FormControl mt={2}>
                <Chakra.FormLabel>Nombre de la obra</Chakra.FormLabel>
                <Chakra.Input
                  placeholder="Nombre..."
                  type="text"
                  value={input.name}
                  name="name"
                />
              </Chakra.FormControl>
              <Chakra.FormControl>
                <Chakra.FormLabel>Imágen de la obra</Chakra.FormLabel>
                <Chakra.Input placeholder="-archivo-" name="image"/>
              </Chakra.FormControl>
              <Chakra.FormControl>
                <Chakra.FormLabel>Tamaño</Chakra.FormLabel>
                <Chakra.Input placeholder="50X70cm..." name="size"/>
              </Chakra.FormControl>
              <Chakra.FormControl>
                <Chakra.FormLabel>
                  Cantidad de ejemplares disponibles
                </Chakra.FormLabel>
                <Chakra.Input placeholder="8" type="number" min={1} name="stock"/>
                Unidades
              </Chakra.FormControl>

              <Chakra.Accordion defaultIndex={[0]} allowMultiple>
                <Chakra.AccordionItem>
                  <Chakra.FormControl>
                    <Chakra.FormLabel>
                      <Chakra.AccordionButton>
                        Técnicas utilizadas
                        <ChevronDownIcon />
                      </Chakra.AccordionButton>
                      <Chakra.AccordionPanel>
                        <Components.CheckboxGroup options={techniques.data} name="techniques"/>
                      </Chakra.AccordionPanel>
                    </Chakra.FormLabel>
                  </Chakra.FormControl>
                </Chakra.AccordionItem>
                <Chakra.AccordionItem>
                  <Chakra.FormControl>
                    <Chakra.FormLabel>
                      <Chakra.AccordionButton>
                        Categorías
                        <ChevronDownIcon />
                      </Chakra.AccordionButton>
                      <Chakra.AccordionPanel>
                        <Components.CheckboxGroup options={categories.data} name="categories"/>
                      </Chakra.AccordionPanel>
                    </Chakra.FormLabel>
                  </Chakra.FormControl>
                </Chakra.AccordionItem>
                <Chakra.FormControl>
                  <Chakra.FormLabel>Soporte de la obra</Chakra.FormLabel>
                  <Components.Dropdown options={optionsMOCK} name="supports"/>
                </Chakra.FormControl>
              </Chakra.Accordion>
            </Chakra.Box>

            <Chakra.FormControl>
              <Chakra.FormLabel>Nombre del autor</Chakra.FormLabel>
              <Chakra.Input placeholder="Nombre..." type="text" />
            </Chakra.FormControl>
            <Chakra.FormControl>
              <Chakra.FormLabel>Descripción de la obra</Chakra.FormLabel>
              <Chakra.Input placeholder="Descripción..." />
            </Chakra.FormControl>

            <Chakra.FormControl>
              <Chakra.FormLabel>Precio sugerido</Chakra.FormLabel>
              <Chakra.Input placeholder="Precio..." />
              USD
            </Chakra.FormControl>
            <Chakra.Button
              type="submit"
              bg="var(--color1)"
              color="var(--color5)"
              _hover={{
                background: "var(--color1-3)",
                transform: "translateY(-4px)",
              }}
              style={{ width: "100%" }}
            >
              Enviar solicitud
            </Chakra.Button>
          </Chakra.Stack>
        </Chakra.Flex>
      </Chakra.HStack>
    </form>
  );
}

export default FormUserCreate;

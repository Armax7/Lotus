import { useState } from "react";
import * as Chakra from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import * as Components from "../../components";
import * as ReactQuery from "@tanstack/react-query";
import * as QueryFns from "../../helpers/page_helpers/Home_helpers/query_fn";
import * as QueryKeys from "../../helpers/page_helpers/Home_helpers/query_keys";
import * as BucketsHelper from "../../helpers/supabase_helpers/buckets";
import { supabase } from "../../lib/supabaseClient";

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
  if (!input.support) {
    error.support = "Debe seleccionar un soporte";
  }
  return error;
}

export const PATH = {
  path: "",
};

function FormUserCreate() {
  const optionsMOCK = ["option1", "option2", "option3"];

  const queries = ReactQuery.useQueries({
    queries: [
      {
        queryKey: [QueryKeys.QK_CATEGORIES],
        queryFn: QueryFns.getCategoriesAxios,
        onError: (error) => {
          console.log("🚀 ~ file: FormUserCreate.jsx:47 ~ error:", error);
          return;
        },
      },
      {
        queryKey: [QueryKeys.QK_TECHNIQUES],
        queryFn: QueryFns.getTechniquesAxios,
        onError: (error) => {
          console.log("🚀 ~ file: FormUserCreate.jsx:55 ~ error:", error);
          return;
        },
      },
      {
        queryKey: [QueryKeys.QK_SUPPORTS],
        queryFn: QueryFns.getSupportsAxios,
        onError: (error) => {
          console.log("🚀 ~ file: FormUserCreate.jsx:65 ~ error:", error);
          return;
        },
      },
    ],
  });
  const [categories, techniques, supports] = queries;

  const [message, setMessage] = useState("");
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [input, setInput] = useState({
    name: "",
    author: "",
    stock: "",
    imageFile,
    size: "",
    price: "",
    techniques: "",
    categories: "",
    support: "",
    description: "",
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

  function handleImageOnChange(e) {
    setImageFile(e.target.files[0]);
  }

  function handleSubmit(el) {
    el.preventDefault();
    console.log(input);

    // const fileUpLoad = imageFile
    //   ? BucketsHelper.uploadArtworkImage(imageFile)
    //   : false;

    // const dataUpload = {
    //   ...input,
    //   ...(imageFile && { image: fileUpLoad }),

    setErrors(validateFormCreate(input));
    const horrores = validateFormCreate(input);

    if (Object.values(horrores).length !== 0) {
      alert("Por favor complete todos los campos obligatorios");
    } else {
      const { data, error } = supabase.storage
      .from("imagebuck")
      .upload("imagebuck/img" + imageFile?.name, imageFile);

    if (data) {
      console.log("este es data ", data);
      axios.post(`${process.env.NEXT_PUBLIC_HOST}/artworks`);
    }

      alert("¡Solicitud enviada!");
      setIsMessageSent(true);
      setMessage("");
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
              <Chakra.Flex>
                <Chakra.FormControl mt={2}>
                  <Chakra.FormLabel>Nombre de la obra</Chakra.FormLabel>
                  <Chakra.Input
                    placeholder="Nombre..."
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={(e) => handleInputOnChange(e)}
                  />
                  <Chakra.HStack>
                    {errors.name && <p>{errors.name}</p>}
                  </Chakra.HStack>
                </Chakra.FormControl>
              </Chakra.Flex>
              <Chakra.Flex>
                <Chakra.FormControl>
                  <Chakra.FormLabel>Imágen de la obra</Chakra.FormLabel>
                  <Chakra.Input
                    type={"file"}
                    value={input.image}
                    name="image"
                    onChange={(e) => handleImageOnChange(e)}
                  />
                </Chakra.FormControl>
              </Chakra.Flex>
              <Chakra.Flex>
                <Chakra.FormControl>
                  <Chakra.FormLabel>Tamaño</Chakra.FormLabel>
                  <Chakra.Input
                    placeholder="50X70cm..."
                    value={input.size}
                    name="size"
                    onChange={(e) => handleInputOnChange(e)}
                  />
                </Chakra.FormControl>
              </Chakra.Flex>
              <Chakra.Flex>
                <Chakra.FormControl>
                  <Chakra.FormLabel>
                    Cantidad de ejemplares disponibles
                  </Chakra.FormLabel>
                  <Chakra.Input
                    placeholder="8"
                    type="number"
                    min={1}
                    value={input.stock}
                    name="stock"
                    onChange={(e) => handleInputOnChange(e)}
                  />
                  Unidades
                </Chakra.FormControl>
              </Chakra.Flex>

              <Chakra.Flex>
                <Chakra.FormLabel>Técnica utilizada</Chakra.FormLabel>
                {techniques.isLoading ? (
                  <Chakra.Button isLoading loadingText={"Cargando..."} />
                ) : techniques.isError ? (
                  <Chakra.Button isDisabled>Seleccionar técnica</Chakra.Button>
                ) : (
                  <Chakra.FormControl>
                    <Components.Dropdown
                      options={techniques.data}
                      value={input.techniques}
                      name="techniques"
                      onChange={(e) => handleInputOnChange(e)}
                    />
                  </Chakra.FormControl>
                )}
              </Chakra.Flex>

              <Chakra.Flex>
                <Chakra.FormLabel>Categoría de la obra</Chakra.FormLabel>
                {categories.isLoading ? (
                  <Chakra.Button isLoading loadingText={"Cargando..."} />
                ) : categories.isError ? (
                  <Chakra.Button isDisabled>
                    Seleccionar categoría
                  </Chakra.Button>
                ) : (
                  <Chakra.FormControl>
                    <Components.Dropdown
                      options={categories.data}
                      value={input.categories}
                      name="categories"
                      onChange={(e) => handleInputOnChange(e)}
                    />
                  </Chakra.FormControl>
                )}
              </Chakra.Flex>

              <Chakra.Flex>
                <Chakra.FormLabel>Soporte de la obra</Chakra.FormLabel>
                {supports.isLoading ? (
                  <Chakra.Button isLoading loadingText={"Cargando..."} />
                ) : supports.isError ? (
                  <Chakra.Button isDisabled>Seleccionar soporte</Chakra.Button>
                ) : (
                  <Chakra.FormControl>
                    <Components.Dropdown
                      options={supports.data}
                      value={input.support}
                      name="support"
                      onChange={(e) => handleInputOnChange(e)}
                    />
                  </Chakra.FormControl>
                )}
              </Chakra.Flex>

              <Chakra.FormControl>
                <Chakra.FormLabel>Nombre del autor</Chakra.FormLabel>
                <Chakra.Input
                  placeholder="Nombre..."
                  type="text"
                  name="author"
                  value={input.author}
                  onChange={(e) => handleInputOnChange(e)}
                />
              </Chakra.FormControl>
              <Chakra.FormControl>
                <Chakra.FormLabel>Descripción de la obra</Chakra.FormLabel>
                <Chakra.Input
                  placeholder="Descripción..."
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={(e) => handleInputOnChange(e)}
                />
              </Chakra.FormControl>

              <Chakra.FormControl>
                <Chakra.FormLabel>Precio sugerido (USD)</Chakra.FormLabel>
                <Chakra.Input
                  placeholder="Precio..."
                  type="number"
                  name="price"
                  value={input.price}
                  onChange={(e) => handleInputOnChange(e)}
                />
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
            </Chakra.Box>
          </Chakra.Stack>
        </Chakra.Flex>
      </Chakra.HStack>
    </form>
  );
}

export default FormUserCreate;

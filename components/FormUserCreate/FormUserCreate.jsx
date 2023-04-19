import { useState } from "react";
import Swal from "sweetalert2";
import * as Chakra from "@chakra-ui/react";
import styles from "../ProfileBuckets/ProfileBuckets.module.css";
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
  if (!input.author_id || isNaN(input.author_id) === false) {
    error.author_id = "Todas las obras requieren un autor";
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
    error.price = "Debe indicar un monto sugerido";
  }
  if (!input.techniques) {
    error.techniques = "Seleccione una técnica";
  }
  if (!input.categories) {
    error.categories = "Seleccione una categoría";
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
        queryKey: [QueryKeys.QK_AUTHORS],
        queryFn: QueryFns.getAllAuthorsAxios,
        onError: (error) => {
          console.log("🚀 ~ file: UpdateArtworkForm.js:26 ~ error:", error);
          return;
        },
      },
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
  const [authors, categories, techniques, supports] = queries;

  const [message, setMessage] = useState("");
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [userIsAuthor, setUserIsAuthor] = useState(null);
  console.log("imageFile es", imageFile);
  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
    size: "",
    price: "",
    author_id: "",
    stock: "",
    technique_id: "",
    category_id: "",
    support_id: "",
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

  const handleDeleteClick = () => {
    setImageFile(null);
  };

  async function postingImage(el) {
    el.preventDefault();
    console.log(input);

    const fileUpLoad = imageFile
      ? await BucketsHelper.uploadArtworkImage(imageFile)
      : false;

    const dataUpload = {
      ...input,
      ...(imageFile && { image: fileUpLoad }),
    };
    return dataUpload;
  }

  async function handleSubmit(el) {
    el.preventDefault();
    console.log(input);

    setErrors(validateFormCreate(input));
    const horrores = validateFormCreate(input);

    if (Object.values(horrores).length !== 0) {
      Swal.fire("Por favor complete todos los campos obligatorios");
    } else {
      //postArwork
      setInput({
        name: "",
        description: "",
        image: "",
        size: "",
        price: "",
        author_id: "",
        stock: "",
        technique_id: "",
        category_id: "",
        support_id: "",
      });

      Swal.fire("¡Solicitud enviada!");
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
              <Chakra.Flex padding={4}>
                <Components.Alert title="Recuerde que para enviar su obra primero debe ser colaborador, contáctenos" />
                {/* <br/>
                <Chakra.Button>
                  <Components.ContactForm />
                </Chakra.Button> */}
              </Chakra.Flex>
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
                  {!!errors.name ? (
                    <Chakra.FormHelperText color={"#9B2C2C"}>
                      Todas las obras requieren un nombre
                    </Chakra.FormHelperText>
                  ) : null}
                </Chakra.FormControl>
              </Chakra.Flex>
              <Chakra.Flex>
                <Chakra.FormControl>
                  <Chakra.FormLabel>Imágen de la obra</Chakra.FormLabel>
                  <Chakra.Input
                    type={"file"}
                    value={input.image}
                    name="image"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => handleImageOnChange(e)}
                    className={styles.fileInput}
                  />
                  {imageFile && (
                    <div className={styles.selectedFile}>
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Archivo seleccionado"
                        className={styles.selectedFileImg}
                      />
                      <Chakra.Flex justifyContent={"space-evenly"}>
                        <Chakra.Button
                          onClick={handleDeleteClick}
                          className={styles.selectedFileButton}
                          bgColor="var(--color1)"
                          color="var(--color5)"
                          _hover={{ transform: "translateY(-4px)" }}
                        >
                          Borrar
                        </Chakra.Button>
                        <Chakra.Button
                          onClick={handleSubmit}
                          handleDeleteClick
                          className={styles.selectedFileButton}
                          bgColor="var(--color2)"
                          color="var(--color5)"
                          _hover={{ transform: "translateY(-4px)" }}
                        >
                          Subir
                        </Chakra.Button>
                      </Chakra.Flex>
                    </div>
                  )}
                  {!!errors.image ? (
                    <Chakra.FormHelperText color={"#9B2C2C"}>
                      Debe seleccionar una o más imágenes
                    </Chakra.FormHelperText>
                  ) : null}
                </Chakra.FormControl>
              </Chakra.Flex>
              <Chakra.Flex>
                <Chakra.FormControl>
                  <Chakra.FormLabel>Tamaño</Chakra.FormLabel>
                  <Chakra.Input
                    placeholder='"50X70cm..."'
                    value={input.size}
                    name="size"
                    onChange={(e) => handleInputOnChange(e)}
                  />
                  {!!errors.size ? (
                    <Chakra.FormHelperText color={"#9B2C2C"}>
                      Debe indicar las medidas de la obra
                    </Chakra.FormHelperText>
                  ) : null}
                </Chakra.FormControl>
              </Chakra.Flex>
              <Chakra.Flex>
                <Chakra.FormControl>
                  <Chakra.FormLabel>
                    Cantidad de ejemplares disponibles
                  </Chakra.FormLabel>
                  <Chakra.Input
                    placeholder='"8"'
                    type="number"
                    min={1}
                    value={input.stock}
                    name="stock"
                    onChange={(e) => handleInputOnChange(e)}
                  />
                  {!!errors.stock ? (
                    <Chakra.FormHelperText color={"#9B2C2C"}>
                      Deben estar disponible una o más unidades
                    </Chakra.FormHelperText>
                  ) : null}
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
                      value={input.technique_id}
                      name="technique_id"
                      onChange={(e) => handleInputOnChange(e)}
                    />
                    {!!errors.techniques ? (
                      <Chakra.FormHelperText color={"#9B2C2C"}>
                        Seleccione una técnica
                      </Chakra.FormHelperText>
                    ) : null}
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
                      value={input.category_id}
                      name="category_id"
                      onChange={(e) => handleInputOnChange(e)}
                    />
                    {!!errors.categories ? (
                      <Chakra.FormHelperText color={"#9B2C2C"}>
                        Seleccione una categoría
                      </Chakra.FormHelperText>
                    ) : null}
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
                      value={input.support_id}
                      name="support_id"
                      onChange={(e) => handleInputOnChange(e)}
                    />
                    {!!errors.support ? (
                      <Chakra.FormHelperText color={"#9B2C2C"}>
                        Seleccione un soporte
                      </Chakra.FormHelperText>
                    ) : null}
                  </Chakra.FormControl>
                )}
              </Chakra.Flex>

              <Chakra.Flex>
                <Chakra.FormLabel>Nombre del autor</Chakra.FormLabel>
                {authors.isLoading ? (
                  <Chakra.Button isLoading loadingText={"Cargando..."} />
                ) : authors.isError ? (
                  <Chakra.Button isDisabled>Seleccionar autor</Chakra.Button>
                ) : (
                  <Chakra.FormControl>
                    <Components.Dropdown
                      options={authors.data}
                      value={input.author_id}
                      name="author_id"
                      onChange={(e) => handleInputOnChange(e)}
                    />
                    {!!errors.authors_id ? (
                      <Chakra.FormHelperText color={"#9B2C2C"}>
                        Todas las obras requieren un autor
                      </Chakra.FormHelperText>
                    ) : null}
                  </Chakra.FormControl>
                )}
              </Chakra.Flex>
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
                  min={100}
                  name="price"
                  value={input.price}
                  onChange={(e) => handleInputOnChange(e)}
                />
                {!!errors.price ? (
                  <Chakra.FormHelperText color={"#9B2C2C"}>
                    Indique un precio (USD)
                  </Chakra.FormHelperText>
                ) : null}
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

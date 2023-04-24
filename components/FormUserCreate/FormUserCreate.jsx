import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Chakra from "@chakra-ui/react";
import styles from "../ProfileBuckets/ProfileBuckets.module.css";
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
    error.image = "Debe seleccionar una imágen";
  }
  if (!input.size) {
    error.size = "Debe indicar las medidas de la obra";
  }
  if (!input.price) {
    error.price = "Debe indicar un monto sugerido";
  }
  if (!input.techniques_id) {
    error.techniques_id = "Seleccione una técnica";
  }
  if (!input.categories_id) {
    error.categories_id = "Seleccione una categoría";
  }
  if (!input.support_id) {
    error.support_id = "Debe seleccionar un soporte";
  }
  return error;
}

function FormUserCreate({ onSubmit: onSubmitProp = defaultPostOnSubmit }) {
  const [errors, setErrors] = useState({});
  console.log(errors);
  const [imageFile, setImageFile] = useState(null);
  //console.log("imageFile es", imageFile);
  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
    size: "",
    price: undefined,
    author_id: undefined,
    stock: 0,
    techniques_id: undefined,
    categories_id: undefined,
    support_id: undefined,
    available: false,
  });

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

  function handleInputOnChange(e) {
    setInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
    console.log(input);
    // setErrors(
    //   validateFormCreate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
  }

  function handleImageOnChange(e) {
    setImageFile(e.target.files[0]);
  }

  const handleDeleteClick = (e) => {
    e.preventDefault();
    //document.getElementById("image_update").value = ""
    setImageFile(null);
  };

  // async function postingImage(el) {
  //   el.preventDefault();
  //   console.log(input);

  //   const fileUpLoad = imageFile
  //     ? await BucketsHelper.uploadArtworkImage(imageFile)
  //     : false;

  //   const dataUpload = {
  //     ...input,
  //     ...(imageFile && { image: fileUpLoad }),
  //   };
  //   return dataUpload;
  // }

  async function handleSubmit(el) {
    el.preventDefault();
    console.log(input);

    try {
      const fileUpLoad = imageFile
        ? await BucketsHelper.uploadArtworkImage(imageFile)
        : null;

      const dataUpload = {
        ...input,
        ...(imageFile && { image: fileUpLoad }),
      };

      setErrors(validateFormCreate({ ...dataUpload, imageUrl: imageFile }));
      const horrores = validateFormCreate({
        ...dataUpload,
        imageUrl: imageFile,
      });

      if (Object.values(horrores).length <= 0) {
        await onSubmitProp(dataUpload);
        //postArwork
        setInput({
          name: "",
          description: "",
          size: "",
          price: undefined,
          author_id: undefined,
          stock: 0,
          techniques_id: undefined,
          categories_id: undefined,
          support_id: undefined,
        });
        setImageFile(null);
        setErrors({});
        Swal.fire("¡Solicitud enviada!");
        // setIsMessageSent(true);
        // setMessage("");
      } else {
        Swal.fire("Por favor complete todos los campos obligatorios");
        console.log("Existen estos errores" + horrores);
      }
    } catch (error) {
      console.log(error);
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
                      {errors.name}
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
                      </Chakra.Flex>
                    </div>
                  )}
                  {!!errors.image ? (
                    <Chakra.FormHelperText color={"#9B2C2C"}>
                      {errors.image}
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
                      {errors.size}
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
                      {errors.stock}
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
                      value={input.techniques_id}
                      name="techniques_id"
                      onChange={handleInputOnChange}
                    />
                    {!!errors.techniques_id ? (
                      <Chakra.FormHelperText color={"#9B2C2C"}>
                        {errors.techniques_id}
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
                      value={input.categories_id}
                      name="categories_id"
                      onChange={handleInputOnChange}
                    />
                    {!!errors.categories_id ? (
                      <Chakra.FormHelperText color={"#9B2C2C"}>
                        {errors.categories_id}
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
                      onChange={handleInputOnChange}
                    />
                    {!!errors.support_id ? (
                      <Chakra.FormHelperText color={"#9B2C2C"}>
                        {errors.support_id}
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
                      onChange={handleInputOnChange}
                    />
                    {!!errors.author_id ? (
                      <Chakra.FormHelperText color={"#9B2C2C"}>
                        {errors.author_id}
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
                    {errors.price}
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

export async function defaultPostOnSubmit(data) {
  const response = await axios
    .post(`${process.env.NEXT_PUBLIC_HOST}/api/artworks`, data)
    .then((res) => res.data);
}

export default FormUserCreate;

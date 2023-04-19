import axios from "axios";
import * as Chakra from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import { useState } from "react";
import * as QueryKeys from "../../helpers/page_helpers/Home_helpers/query_keys";
import * as QueryFns from "../../helpers/page_helpers/Home_helpers/query_fn";
import * as Components from "../../components";
import * as BucketsHelper from "../../helpers/supabase_helpers/buckets";
import validate from "./validate";

function PostArtworkForm({
  onSubmit: onSubmitProp = defaultPostOnSubmit,
  onClose: onCloseProp = () => {},
  justifyContent: justifyContentProp = "space-evenly",
  bgColor: bgColorProp = "var(--color3)",
  className: classNameProp,
  ...props
}) {
  const queryClient = new ReactQuery.QueryClient();

  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    size: "",
    price: undefined,
    author_id: undefined,
    category_id: undefined,
    technique_id: undefined,
    support_id: undefined,
    stock: 0,
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
          console.log("🚀 ~ file: UpdateArtworkForm.jsx:47 ~ error:", error);
          return;
        },
      },
      {
        queryKey: [QueryKeys.QK_TECHNIQUES],
        queryFn: QueryFns.getTechniquesAxios,
        onError: (error) => {
          console.log("🚀 ~ file: UpdateArtworkForm.jsx:55 ~ error:", error);
          return;
        },
      },
      {
        queryKey: [QueryKeys.QK_SUPPORTS],
        queryFn: QueryFns.getSupportsAxios,
        onError: (error) => {
          console.log("🚀 ~ file: UpdateArtworkForm.jsx:65 ~ error:", error);
          return;
        },
      },
    ],
  });
  const [authors, categories, techniques, supports] = queries;

  function handleInputOnChange(event) {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleBoolInputOnChange(event) {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.checked,
      };
    });
  }

  function handleImageOnChange(event) {
    setImageFile(event.target.files[0]);
  }

  function handleImageOnDelete(event) {
    event.preventDefault();
    document.getElementById("image_update").value = "";
    setImageFile(null);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    try {
      const fileUrl = imageFile
        ? await BucketsHelper.uploadArtworkImage(imageFile)
        : null;

      const dataPreview = {
        ...formData,
        ...(imageFile && { image: fileUrl }),
      };

      setErrors(validate({ ...dataPreview, imageUrl: fileUrl }));
      const currentErrors = validate({ ...dataPreview, imageUrl: fileUrl });

      if (Object.values(currentErrors).length <= 0) {
        await onSubmitProp(dataPreview);

        setFormData({
          name: "",
          description: "",
          size: "",
          price: undefined,
          author_id: undefined,
          category_id: undefined,
          technique_id: undefined,
          support_id: undefined,
          stock: 0,
          available: false,
        });
        setImageFile(null);
        setErrors({});
        onCloseProp();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <Chakra.Flex
        className={classNameProp}
        justifyContent={justifyContentProp}
        bgColor={bgColorProp}
        {...props}
      >
        <Chakra.Flex flexDirection={"column"}>
          <Chakra.Box fontSize={"4xl"}>Editar obra</Chakra.Box>
          <Chakra.Flex>
            <Chakra.FormLabel fontSize={"2xl"} whiteSpace={"nowrap"}>
              Nombre de la obra:
            </Chakra.FormLabel>
            <Chakra.FormControl id="name_update" isInvalid={!!errors.name}>
              <Chakra.Input
                name="name"
                value={formData.name}
                onChange={handleInputOnChange}
                placeholder={"Nombre de la obra"}
                bgColor={"var(--color5)"}
                mx={"5px"}
                maxW={"500px"}
                minW={"100px"}
              />
              {!!errors.name ? (
                <Chakra.FormHelperText>{errors.name}</Chakra.FormHelperText>
              ) : null}
            </Chakra.FormControl>
          </Chakra.Flex>
          <Chakra.FormLabel m={"5px"} fontSize={"2xl"} whiteSpace={"nowrap"}>
            Descripción de la obra:
          </Chakra.FormLabel>
          <Chakra.FormControl id="description_update">
            <Chakra.Textarea
              name="description"
              value={formData.description}
              onChange={handleInputOnChange}
              placeholder={"Descripción de la obra"}
              maxLength={255}
              bgColor={"var(--color5)"}
              mx={"5px"}
              maxH={"150"}
              maxW={"500px"}
              minW={"100px"}
            />
          </Chakra.FormControl>
          <Chakra.Flex m={"5px"}>
            <Chakra.FormLabel fontSize={"2xl"} whiteSpace={"nowrap"}>
              Imagen de la obra:
            </Chakra.FormLabel>
            <Chakra.FormControl
              id="image_update"
              maxW={"340px"}
              minW={"100px"}
              isInvalid={!!errors.imageUrl}
            >
              <Chakra.Input
                name="image"
                type={"file"}
                onChange={handleImageOnChange}
                bgColor={"var(--color5)"}
                p={"5px"}
                mx={"5px"}
                maxW={"340px"}
                minW={"100px"}
              />
              {!!errors.imageUrl ? (
                <Chakra.FormHelperText>{errors.imageUrl}</Chakra.FormHelperText>
              ) : null}
            </Chakra.FormControl>
          </Chakra.Flex>
          <Chakra.Flex m={"5px"}>
            <Chakra.FormLabel fontSize={"2xl"} whiteSpace={"nowrap"}>
              Tamaño de la obra:
            </Chakra.FormLabel>
            <Chakra.FormControl id="size_update" isInvalid={!!errors.size}>
              <Chakra.Input
                name="size"
                value={formData.size}
                onChange={handleInputOnChange}
                placeholder={"Dimensiones de la obra; ej. 35x50 cm"}
                bgColor={"var(--color5)"}
                p={"5px"}
                mx={"5px"}
                maxW={"300px"}
                minW={"100px"}
              />
              {!!errors.size ? (
                <Chakra.FormHelperText>{errors.size}</Chakra.FormHelperText>
              ) : null}
            </Chakra.FormControl>
          </Chakra.Flex>
          <Chakra.Flex m={"5px"}>
            <Chakra.FormLabel fontSize={"2xl"} whiteSpace={"nowrap"}>
              Precio de la obra (USD):
            </Chakra.FormLabel>
            <Chakra.FormControl id="price_update" isInvalid={!!errors.price}>
              <Chakra.NumberInput
                name="price"
                value={formData.price}
                onChange={(value) =>
                  handleInputOnChange({ target: { name: "price", value } })
                }
                onKeyDown={(e) => (e.key === "Enter" ? e.target.blur() : null)}
                min={0}
                precision={2}
                bgColor={"var(--color5)"}
                borderRadius={"5px"}
              >
                <Chakra.NumberInputField placeholder={0.0} />
                <Chakra.NumberInputStepper>
                  <Chakra.NumberIncrementStepper />
                  <Chakra.NumberDecrementStepper />
                </Chakra.NumberInputStepper>
              </Chakra.NumberInput>
              {!!errors.price ? (
                <Chakra.FormHelperText>{errors.price}</Chakra.FormHelperText>
              ) : null}
            </Chakra.FormControl>
          </Chakra.Flex>
          <Chakra.Flex m={"5px"}>
            <Chakra.FormLabel fontSize={"2xl"} whiteSpace={"nowrap"}>
              Autor de la obra:
            </Chakra.FormLabel>
            {authors.isLoading ? (
              <Chakra.Button isLoading loadingText={"Cargando..."} />
            ) : authors.isError ? (
              <Chakra.Button isDisabled>Selecciona autor</Chakra.Button>
            ) : (
              <Chakra.FormControl
                id="author_update"
                isInvalid={!!errors.author}
              >
                <Components.Dropdown
                  options={authors.data}
                  name={"author_id"}
                  value={formData.author_id}
                  onChange={handleInputOnChange}
                  bgColor={"var(--color5)"}
                  w={"fit-content"}
                  minW={"100px"}
                />
                {!!errors.author ? (
                  <Chakra.FormHelperText>{errors.author}</Chakra.FormHelperText>
                ) : null}
              </Chakra.FormControl>
            )}
          </Chakra.Flex>
          <Chakra.Flex m={"5px"}>
            <Chakra.FormLabel fontSize={"2xl"} whiteSpace={"nowrap"}>
              Categoría de la obra:
            </Chakra.FormLabel>
            {categories.isLoading ? (
              <Chakra.Button isLoading loadingText={"Cargando..."} />
            ) : categories.isError ? (
              <Chakra.Button isDisabled>Seleccionar categoría</Chakra.Button>
            ) : (
              <Chakra.FormControl
                id="category_update"
                isInvalid={!!errors.category}
              >
                <Components.Dropdown
                  options={categories.data}
                  name={"category_id"}
                  value={formData.category_id}
                  onChange={handleInputOnChange}
                  bgColor={"var(--color5)"}
                  w={"fit-content"}
                  minW={"100px"}
                />
                {!!errors.category ? (
                  <Chakra.FormHelperText>
                    {errors.category}
                  </Chakra.FormHelperText>
                ) : null}
              </Chakra.FormControl>
            )}
          </Chakra.Flex>
          <Chakra.Flex m={"5px"}>
            <Chakra.FormLabel fontSize={"2xl"} whiteSpace={"nowrap"}>
              Técnica de la obra:
            </Chakra.FormLabel>
            {techniques.isLoading ? (
              <Chakra.Button isLoading loadingText={"Cargando..."} />
            ) : techniques.isError ? (
              <Chakra.Button isDisabled>Seleccionar técnica</Chakra.Button>
            ) : (
              <Chakra.FormControl
                id="technique_update"
                isInvalid={!!errors.technique}
              >
                <Components.Dropdown
                  options={techniques.data}
                  name={"technique_id"}
                  value={formData.technique_id}
                  onChange={handleInputOnChange}
                  bgColor={"var(--color5)"}
                  w={"fit-content"}
                  minW={"100px"}
                />
                {!!errors.technique ? (
                  <Chakra.FormHelperText>
                    {errors.technique}
                  </Chakra.FormHelperText>
                ) : null}
              </Chakra.FormControl>
            )}
          </Chakra.Flex>
          <Chakra.Flex m={"5px"}>
            <Chakra.FormLabel fontSize={"2xl"} whiteSpace={"nowrap"}>
              Soporte de la obra:
            </Chakra.FormLabel>
            {supports.isLoading ? (
              <Chakra.Button isLoading loadingText={"Cargando..."} />
            ) : supports.isError ? (
              <Chakra.Button isDisabled>Seleccionar soporte</Chakra.Button>
            ) : (
              <Chakra.FormControl
                id="support_update"
                isInvalid={!!errors.support}
              >
                <Components.Dropdown
                  options={supports.data}
                  name={"support_id"}
                  value={formData.support_id}
                  onChange={handleInputOnChange}
                  bgColor={"var(--color5)"}
                  w={"fit-content"}
                  minW={"100px"}
                />
                {!!errors.support ? (
                  <Chakra.FormHelperText>
                    {errors.support}
                  </Chakra.FormHelperText>
                ) : null}
              </Chakra.FormControl>
            )}
          </Chakra.Flex>
          <Chakra.Flex m={"5px"} gap={"30px"}>
            <Chakra.Flex>
              <Chakra.FormLabel fontSize={"2xl"} whiteSpace={"nowrap"}>
                Stock:
              </Chakra.FormLabel>
              <Chakra.FormControl
                id="stock_update"
                maxW={"100px"}
                minW={"75px"}
                isInvalid={!!errors.stock}
              >
                <Chakra.NumberInput
                  name="stock"
                  value={formData.stock}
                  onChange={(value) =>
                    handleInputOnChange({ target: { name: "stock", value } })
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" ? e.target.blur() : null
                  }
                  min={0}
                  precision={0}
                  bgColor={"var(--color5)"}
                  borderRadius={"5px"}
                >
                  <Chakra.NumberInputField placeholder={formData.stock} />
                  <Chakra.NumberInputStepper>
                    <Chakra.NumberIncrementStepper />
                    <Chakra.NumberDecrementStepper />
                  </Chakra.NumberInputStepper>
                </Chakra.NumberInput>
                {!!errors.stock ? (
                  <Chakra.FormHelperText>{errors.stock}</Chakra.FormHelperText>
                ) : null}
              </Chakra.FormControl>
            </Chakra.Flex>
            <Chakra.Flex>
              <Chakra.FormLabel fontSize={"2xl"} whiteSpace={"nowrap"}>
                Disponible?{" "}
              </Chakra.FormLabel>
              <Chakra.FormControl mt={"6px"} isInvalid={!!errors.available}>
                <Chakra.Switch
                  id="available_update"
                  name="available"
                  defaultChecked={formData.available}
                  isChecked={formData.available}
                  size={"lg"}
                  onChange={handleBoolInputOnChange}
                />
                {!!errors.available ? (
                  <Chakra.FormHelperText>
                    {errors.available}
                  </Chakra.FormHelperText>
                ) : null}
              </Chakra.FormControl>
            </Chakra.Flex>
          </Chakra.Flex>
          <Chakra.Button type="submit" bgColor={"#38761D"} color={"white"}>
            Submit
          </Chakra.Button>
          <Chakra.Button
            onClick={onCloseProp}
            bgColor={"#820000"}
            textColor={"white"}
            mx={"28%"}
            w={"250px"}
            minW={"100px"}
            my={"10px"}
          >
            Cancelar
          </Chakra.Button>
        </Chakra.Flex>
        <Chakra.Flex flexDirection={"column"} w={"30%"} alignSelf={"center"}>
          <Chakra.Image
            m={"auto"}
            src={imageFile ? URL.createObjectURL(imageFile) : undefined}
            fallback={<Chakra.Image src={"/lotusImagotipo.svg"} />}
          />
          {imageFile && (
            <Chakra.Button
              onClick={handleImageOnDelete}
              bgColor={"#820000"}
              color={"white"}
              m={"5px"}
            >
              Cancelar imagen
            </Chakra.Button>
          )}
        </Chakra.Flex>
      </Chakra.Flex>
    </form>
  );
}

export async function defaultPostOnSubmit(data) {
  const response = await axios
    .post(`${process.env.NEXT_PUBLIC_HOST}/api/artworks`, data)
    .then((res) => res.data);

  return response;
}

export default PostArtworkForm;

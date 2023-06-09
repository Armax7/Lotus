import axios from "axios";
import * as Chakra from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import { useState } from "react";
import * as QueryKeys from "../../helpers/page_helpers/Home_helpers/query_keys";
import * as QueryFns from "../../helpers/page_helpers/Home_helpers/query_fn";
import * as Components from "../../components";
import * as BucketsHelper from "../../helpers/supabase_helpers/buckets";
import validate from "./validate";
import * as ProductManagment from "../../helpers/stripe_helpers/product_management";

function UpdateArtworkForm({
  artwork,
  onSubmit: onSubmitProp = defaultUpdateOnSubmit,
  onClose: onCloseProp = () => {},
  justifyContent: justifyContentProp = "space-evenly",
  bgColor: bgColorProp = "var(--color3)",
  className: classNameProp,
  ...props
}) {
  if (!artwork.id)
    throw new SyntaxError(
      "<UpdateArtworkForm/> must have an artwork object; eg. <UpdateArtworkForm artwork={artworkExample} />"
    );

  const queryClient = new ReactQuery.QueryClient();

  const [errors, setErrors] = useState({ name: "" });
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: artwork.name,
    description: "",
    size: "",
    price: undefined,
    author_id: artwork.author_id,
    category_id: artwork.category_id,
    technique_id: artwork.technique_id,
    support_id: artwork.support_id,
    stock: artwork.stock,
    available: artwork.available,
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
        : false;

      const dataPreview = {
        ...formData,
        id: artwork.id,
        ...(imageFile && { image: fileUrl }),
      };

      setErrors(validate(dataPreview));
      const currentErrors = validate(dataPreview);

      if (Object.values(currentErrors).length <= 0) {
        await onSubmitProp(dataPreview);

        setFormData({
          name: artwork.name,
          description: "",
          size: "",
          price: undefined,
          author_id: artwork.author_id,
          category_id: artwork.category_id,
          technique_id: artwork.technique_id,
          support_id: artwork.support_id,
          stock: artwork.stock,
          available: artwork.available,
        });
        setImageFile(null);
        setErrors({ name: "" });
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
                placeholder={artwork.name}
                bgColor={"var(--color5)"}
                mx={"5px"}
                maxW={"500px"}
                minW={"100px"}
              />
              {!!errors.name ? (
                <Chakra.FormHelperText>
                  Nombre de la obra no puede estar vació
                </Chakra.FormHelperText>
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
              placeholder={artwork.description}
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
            <Chakra.FormControl id="image_update" maxW={"340px"} minW={"100px"}>
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
            </Chakra.FormControl>
          </Chakra.Flex>
          <Chakra.Flex m={"5px"}>
            <Chakra.FormLabel fontSize={"2xl"} whiteSpace={"nowrap"}>
              Tamaño de la obra:
            </Chakra.FormLabel>
            <Chakra.FormControl id="size_update">
              <Chakra.Input
                name="size"
                value={formData.size}
                onChange={handleInputOnChange}
                placeholder={artwork.size}
                bgColor={"var(--color5)"}
                p={"5px"}
                mx={"5px"}
                maxW={"300px"}
                minW={"100px"}
              />
            </Chakra.FormControl>
          </Chakra.Flex>
          <Chakra.Flex m={"5px"}>
            <Chakra.FormLabel fontSize={"2xl"} whiteSpace={"nowrap"}>
              Precio de la obra (USD):
            </Chakra.FormLabel>
            <Chakra.FormControl id="price_update">
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
                <Chakra.NumberInputField placeholder={artwork.price} />
                <Chakra.NumberInputStepper>
                  <Chakra.NumberIncrementStepper />
                  <Chakra.NumberDecrementStepper />
                </Chakra.NumberInputStepper>
              </Chakra.NumberInput>
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
              <Chakra.FormControl id="author_update">
                <Components.Dropdown
                  options={authors.data}
                  name={"author_id"}
                  value={formData.author_id}
                  onChange={handleInputOnChange}
                  bgColor={"var(--color5)"}
                  w={"fit-content"}
                  minW={"100px"}
                />
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
              <Chakra.FormControl id="category_update">
                <Components.Dropdown
                  options={categories.data}
                  name={"category_id"}
                  value={formData.category_id}
                  onChange={handleInputOnChange}
                  bgColor={"var(--color5)"}
                  w={"fit-content"}
                  minW={"100px"}
                />
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
              <Chakra.FormControl id="technique_update">
                <Components.Dropdown
                  options={techniques.data}
                  name={"technique_id"}
                  value={formData.technique_id}
                  onChange={handleInputOnChange}
                  bgColor={"var(--color5)"}
                  w={"fit-content"}
                  minW={"100px"}
                />
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
              <Chakra.FormControl id="support_update">
                <Components.Dropdown
                  options={supports.data}
                  name={"support_id"}
                  value={formData.support_id}
                  onChange={handleInputOnChange}
                  bgColor={"var(--color5)"}
                  w={"fit-content"}
                  minW={"100px"}
                />
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
                  placeholder={artwork.stock}
                  min={0}
                  precision={0}
                  bgColor={"var(--color5)"}
                  borderRadius={"5px"}
                >
                  <Chakra.NumberInputField />
                  <Chakra.NumberInputStepper>
                    <Chakra.NumberIncrementStepper />
                    <Chakra.NumberDecrementStepper />
                  </Chakra.NumberInputStepper>
                </Chakra.NumberInput>
              </Chakra.FormControl>
            </Chakra.Flex>
            <Chakra.Flex>
              <Chakra.FormLabel fontSize={"2xl"} whiteSpace={"nowrap"}>
                Disponible?{" "}
              </Chakra.FormLabel>
              <Chakra.FormControl alignSelf={"center"}>
                <Chakra.Switch
                  id="available_update"
                  name="available"
                  defaultChecked={artwork.available}
                  isChecked={formData.available}
                  size={"lg"}
                  onChange={handleBoolInputOnChange}
                />
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
        <Chakra.Flex flexDirection={"column"} w={"30%"}>
          <Chakra.Image
            m={"auto"}
            src={imageFile ? URL.createObjectURL(imageFile) : artwork.image}
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

export async function defaultUpdateOnSubmit(data) {
  const response = await axios
    .put(`${process.env.NEXT_PUBLIC_HOST}/api/artworks`, data)
    .then((res) => res.data);
  return response;
}

export default UpdateArtworkForm;

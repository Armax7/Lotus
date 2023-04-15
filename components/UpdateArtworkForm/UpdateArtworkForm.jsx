import * as Chakra from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import { useState } from "react";
import * as QueryKeys from "../../helpers/page_helpers/Home_helpers/query_keys";
import * as QueryFns from "../../helpers/page_helpers/Home_helpers/query_fn";
import * as Components from "..";

function UpdateArtworkForm({
  artwork,
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

  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    size: "",
    price: undefined,
    author: undefined,
  });

  const authors = ReactQuery.useQuery(
    [QueryKeys.QK_AUTHORS],
    QueryFns.getAllAuthorsAxios,
    {
      onError: (error) => {
        console.log("🚀 ~ file: UpdateArtworkForm.js:26 ~ error:", error);
        return;
      },
    }
  );

  function handleInputOnChange(event) {
    // setFormData((prevState) => {
    //   return {
    //     ...prevState,
    //     [event.target.name]: event.target.value,
    //   };
    // });
    console.log(event.target.value);
  }

  function handleImageOnChange(event) {
    setImageFile(event.target.files[0]);
  }

  function handleImageOnDelete(event) {
    event.preventDefault();
    setImageFile(null);
  }

  function handleDropdownOnChange(event) {
    event.preventDefault();
    console.log(
      "🚀 ~ file: UpdateArtworkForm.jsx:47 ~ handleDropdownOnChange ~ event.target.value:",
      event.target.value
    );
  }

  return (
    <form>
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
            <Chakra.FormControl id="name_update">
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
                defaultValue={artwork.price}
                min={0}
                precision={2}
                bgColor={"var(--color5)"}
                borderRadius={"5px"}
              >
                <Chakra.NumberInputField
                  name={"price"}
                  value={formData.price}
                  onChange={handleInputOnChange}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? e.target.blur() : null
                  }
                />
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
              <Chakra.FormControl id="size_update">
                <Components.Dropdown
                  options={authors.data}
                  name={"author"}
                  value={formData.author}
                  onChange={handleDropdownOnChange}
                  bgColor={"var(--color5)"}
                  w={"fit-content"}
                  minW={"100px"}
                />
              </Chakra.FormControl>
            )}
          </Chakra.Flex>
        </Chakra.Flex>
        <Chakra.Flex flexDirection={"column"}>
          <Chakra.Image
            src={imageFile ? URL.createObjectURL(imageFile) : artwork.image}
          />
          {imageFile && (
            <Chakra.Button
              onChange={handleImageOnDelete}
              bgColor={"red"}
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

export default UpdateArtworkForm;

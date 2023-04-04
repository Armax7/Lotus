import { useState } from "react";
import { AccordionIcon } from "@chakra-ui/react";
import * as Chakra from "@chakra-ui/react";
import { theme } from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import * as Components from "../../components";
import * as QueryFns from "../../helpers/page_helpers/Home_helpers/query_fn";
import * as QueryKeys from "../../helpers/page_helpers/Home_helpers/query_keys";
import * as ArtworksMocks from "../../helpers/mocks/layouts_mock/Artworks_mock";

function Artworks({
  techniques = ArtworksMocks.techniques_mock,
  categories = ArtworksMocks.categories_mock,
  supports = ArtworksMocks.supports_mock,
}) {
  const queryClient = ReactQuery.useQueryClient();

  const [filters, setFilters] = useState({
    name: "",
    techniques: [],
    categories: [],
    supports: [],
  });
  const filteredArtworks = ReactQuery.useQuery(
    [QueryKeys.QK_ARTWORKS_BY_QUERY],
    async () => {
      const res = await QueryFns.getAllArtworksByQueryAxios(filters);
      return res;
    }
  );

  function handleTechniqueOnChange(event) {
    setFilters((prevState) => ({ ...prevState, techniques: event }));
  }

  function handleCategoryOnChange(event) {
    setFilters((prevState) => ({ ...prevState, categories: event }));
  }

  function handleSupportOnChange(event) {
    setFilters((prevState) => ({ ...prevState, supports: event }));
  }

  function handleNameOnChange(event) {
    setFilters((prevState) => ({ ...prevState, name: event.target.value }));
  }

  async function handleOnFilter(event) {
    filteredArtworks.refetch();
  }

  return (
    <Chakra.Box maxW={"1200px"} m={"auto"} display={"flex"} flexDir={"column"}>
      <Components.SearchBar m={"auto"} onChange={handleNameOnChange} />
      <Chakra.Box>Buscar por nombre: {filters.name}</Chakra.Box>

      <Chakra.Accordion allowToggle>
        <Chakra.AccordionItem>
          <Chakra.AccordionButton
            maxW={"100%"}
            minW={"max-content"}
            fontWeight={"600"}
            letterSpacing={"1px"}
            margin={"8px"}
            bgColor="var(--color2)"
            _hover={{ backgroundColor: "var(--color1)", transform:"translateY(-4px)" }}
            borderRadius={"2vw"}
            color={"var(--white)"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <p>Filter by Technique</p>
            <AccordionIcon transform={"scale(1.5)"}/>
          </Chakra.AccordionButton>

          <Chakra.AccordionPanel>
            <Components.CheckboxGroup
              options={techniques}
              onChange={handleTechniqueOnChange}
              colorScheme={"lotus"}
              bgColor={"var(--color5)"}
              borderRadius={"1rem"}
              p={"1rem"}
            />
          </Chakra.AccordionPanel>
        </Chakra.AccordionItem>

        <Chakra.AccordionItem>
          <Chakra.AccordionButton
            maxW={"80%"}
            minW={"max-content"}
            fontWeight={"600"}
            letterSpacing={"1px"}
            margin={"8px"}
            bgColor="var(--color2)"
            _hover={{ backgroundColor: "var(--color1)", transform:"translateY(-4px)" }}
            borderRadius={"2vw"}
            color={"var(--white)"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <p>Filter by Category</p>
            <AccordionIcon transform={"scale(1.5)"}/>
          </Chakra.AccordionButton>

          <Chakra.AccordionPanel>
            <Components.CheckboxGroup
              options={categories}
              onChange={handleCategoryOnChange}
              colorScheme={"lotus"}
              bgColor={"var(--color5)"}
              borderRadius={"1rem"}
              p={"1rem"}
            />
          </Chakra.AccordionPanel>
        </Chakra.AccordionItem>

        <Chakra.AccordionItem>
          <Chakra.AccordionButton
            maxW={"60%"}
            minW={"max-content"}
            fontWeight={"600"}
            letterSpacing={"1px"}
            margin={"8px"}
            bgColor="var(--color2)"
            _hover={{ backgroundColor: "var(--color1)", transform:"translateY(-4px)" }}
            borderRadius={"2vw"}
            color={"var(--white)"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <p>Filter by Support</p>
            <AccordionIcon transform={"scale(1.5)"}/>
          </Chakra.AccordionButton>
          <Chakra.AccordionPanel>
            <Components.CheckboxGroup
              options={supports}
              onChange={handleSupportOnChange}
              colorScheme={"lotus"}
              bgColor={"var(--color5)"}
              borderRadius={"1rem"}
              p={"1rem"}
            />
          </Chakra.AccordionPanel>
        </Chakra.AccordionItem>
      </Chakra.Accordion>

      <Chakra.Button
        alignSelf={"center"}
        padding={"30px"}
        width={"50%"}
        maxW={"500px"}
        minW={"320px"}
        margin={"10px auto"}
        borderRadius={"100px"}
        fontSize={"22px"}
        onClick={handleOnFilter}
        bgColor="var(--color1)"
        color={"var(--white)"}
        _hover={{
          backgroundColor: "var(--color1-3)",
          transform: "translateY(-4px)",
        }}
      >
        FILTER
      </Chakra.Button>
      <Components.CardContainer cards={filteredArtworks.data} />
    </Chakra.Box>
  );
}

export async function getServerSideProps() {
  const queryClient = new ReactQuery.QueryClient();

  await queryClient.prefetchQuery(
    [QueryKeys.QK_ARTWORKS_BY_QUERY],
    QueryFns.getAllArtworksByQueryAxios
  );

  return {
    props: {
      dehydratedState: ReactQuery.dehydrate(queryClient),
    },
  };
}

export default Artworks;

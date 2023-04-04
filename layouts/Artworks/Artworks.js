import { useState } from "react";
import { AccordionIcon } from "@chakra-ui/react";
import * as Chakra from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import * as Components from "../../components";
import * as QueryFns from "../../helpers/page_helpers/Home_helpers/query_fn";
import * as QueryKeys from "../../helpers/page_helpers/Home_helpers/query_keys";
import * as ArtworksMocks from "../../helpers/mocks/layouts_mock/Artworks_mock";

function Artworks({
  artworkName,
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
    console.log(filters);
    filteredArtworks.refetch();
  }

  return (
    <Chakra.Box>
      <Chakra.Box>
        Buscar por nombre: {filters.name}
        <Components.SearchBar onChange={handleNameOnChange} />
      </Chakra.Box>
      <Chakra.Accordion allowToggle>
        <Chakra.AccordionItem>
          <Chakra.AccordionButton
            maxW={"15vmax"}
            bgColor={"#804674"}
            _hover={{ backgroundColor: "#A7727D" }}
            borderRadius={"2vw"}
            color={"white"}
          >
            Filter by Technique
            <AccordionIcon />
          </Chakra.AccordionButton>
          <Chakra.AccordionPanel>
            <Components.CheckboxGroup
              options={techniques}
              onChange={handleTechniqueOnChange}
              colorScheme={"teal"}
              bgColor={"#F9F5E7"}
              borderRadius={"1rem"}
              p={"1rem"}
            />
          </Chakra.AccordionPanel>
        </Chakra.AccordionItem>
        <Chakra.AccordionItem>
          <Chakra.AccordionButton
            maxW={"15vmax"}
            bgColor={"#804674"}
            _hover={{ backgroundColor: "#A7727D" }}
            borderRadius={"2vw"}
            color={"white"}
          >
            Filter by Category
            <AccordionIcon />
          </Chakra.AccordionButton>
          <Chakra.AccordionPanel>
            <Components.CheckboxGroup
              options={categories}
              onChange={handleCategoryOnChange}
              colorScheme={"teal"}
              bgColor={"#F9F5E7"}
              borderRadius={"1rem"}
              p={"1rem"}
            />
          </Chakra.AccordionPanel>
        </Chakra.AccordionItem>
        <Chakra.AccordionItem>
          <Chakra.AccordionButton
            maxW={"15vmax"}
            bgColor={"#804674"}
            _hover={{ backgroundColor: "#A7727D" }}
            borderRadius={"2vw"}
            color={"white"}
          >
            Filter by Support
            <AccordionIcon />
          </Chakra.AccordionButton>
          <Chakra.AccordionPanel>
            <Components.CheckboxGroup
              options={supports}
              onChange={handleSupportOnChange}
              colorScheme={"teal"}
              bgColor={"#F9F5E7"}
              borderRadius={"1rem"}
              p={"1rem"}
            />
          </Chakra.AccordionPanel>
        </Chakra.AccordionItem>
        <Chakra.Button
          onClick={handleOnFilter}
          bgColor={"#804674"}
          color={"white"}
          _hover={{ backgroundColor: "#A7727D" }}
        >
          Filter
        </Chakra.Button>
      </Chakra.Accordion>
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

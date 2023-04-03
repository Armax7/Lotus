import { useState } from "react";
import { AccordionIcon } from "@chakra-ui/react";
import * as Chakra from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import * as Components from "../../components";
import * as QueryFns from "../../helpers/page_helpers/Home_helpers/query_fn";
import * as QueryKeys from "../../helpers/page_helpers/Home_helpers/query_keys";
import * as ArtworksMocks from "../../helpers/mocks/layouts_mock/Artworks_mock";

function Artworks({
  artworks = ArtworksMocks.artworks_mock,
  techniques = ArtworksMocks.techniques_mock,
  categories = ArtworksMocks.categories_mock,
  supports = ArtworksMocks.supports_mock,
}) {
  const queryClient = ReactQuery.useQueryClient();

  const [filters, setFilters] = useState({
    techniques: [],
    categories: [],
    supports: [],
  });

  const filteredArtworks = ReactQuery.useQuery(
    [QueryKeys.QK_ARTWORKS_BY_QUERY],
    async () => {
      const res = await QueryFns.getAllArtworksByQueryAxios(filters);
      return res;
    },
    {
      onSuccess: () => {},
      onSettled: (response) => {
        console.log(
          response,
          queryClient.getQueryState([QueryKeys.QK_ARTWORKS_BY_QUERY])
        );
      },
      notifyOnChangeProps: ["data", "status"],
    }
  );

  function handleTechniqueOnChange(event) {
    console.log(event);
    setFilters((prevState) => ({ ...prevState, techniques: event }));
  }

  function handleCategoryOnChange(event) {
    console.log(event);
    setFilters((prevState) => ({ ...prevState, categories: event }));
  }

  function handleSupportOnChange(event) {
    console.log(event);
    setFilters((prevState) => ({ ...prevState, supports: event }));
  }

  async function handleOnFilter(event) {
    console.log("Selected Techniques: ", filters.techniques);
    console.log("Selected Categories: ", filters.categories);
    console.log("Selected Support: ", filters.supports);
    filteredArtworks.refetch();
  }

  return (
    <Chakra.Box>
      <Chakra.Accordion allowToggle>
        <Chakra.AccordionItem>
          <Chakra.AccordionButton>
            Filter by Technique
            <AccordionIcon />
          </Chakra.AccordionButton>
          <Chakra.AccordionPanel>
            <Components.CheckboxGroup
              options={techniques}
              onChange={handleTechniqueOnChange}
            />
          </Chakra.AccordionPanel>
        </Chakra.AccordionItem>
        <Chakra.AccordionItem>
          <Chakra.AccordionButton>
            Filter by Category
            <AccordionIcon />
          </Chakra.AccordionButton>
          <Chakra.AccordionPanel>
            <Components.CheckboxGroup
              options={categories}
              onChange={handleCategoryOnChange}
            />
          </Chakra.AccordionPanel>
        </Chakra.AccordionItem>
        <Chakra.AccordionItem>
          <Chakra.AccordionButton>
            Filter by Support
            <AccordionIcon />
          </Chakra.AccordionButton>
          <Chakra.AccordionPanel>
            <Components.CheckboxGroup
              options={supports}
              onChange={handleSupportOnChange}
            />
          </Chakra.AccordionPanel>
        </Chakra.AccordionItem>
        <Chakra.Button onClick={handleOnFilter}>Filter</Chakra.Button>
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

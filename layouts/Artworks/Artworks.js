import { useState } from "react";
import { AccordionIcon } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
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
    await filteredArtworks.refetch();
  }

  async function handleOnClickResetFilters(event) {
    const clearedValues = {
      name: "",
      techniques: [],
      categories: [],
      supports: [],
    };
    setFilters(clearedValues);
    await queryClient.fetchQuery({
      queryKey: [QueryKeys.QK_ARTWORKS_BY_QUERY],
      queryFn: () => QueryFns.getAllArtworksByQueryAxios(clearedValues),
    });
  }
  const [isLargerThan355] = Chakra.useMediaQuery("(min-width: 380px)");
  return (
    <div style={{ background: "var(--color5)", paddingBottom: "38px" }}>
      <Chakra.Box
        maxW={"1200px"}
        m={"auto"}
        padding={"0 12px"}
        display={"flex"}
        flexDir={"column"}
      >
        <Components.SearchBar
          m={"24px auto 0"}
          value={filters.name}
          onChange={handleNameOnChange}
          onEnter={handleOnFilter}
        />
        <Chakra.Box
          bg={"var(--color1-2)"}
          m={"22px 0"}
          borderRadius={"12px"}
          padding={"12px"}
          color={"var(--white)"}
          fontFamily={"Poppins"}
        >
          Buscar por nombre: <b>{filters.name}</b>
        </Chakra.Box>

        {isLargerThan355 ? (
          <Chakra.Tabs isFitted variant="soft-rounded" colorScheme="lotus">
            <Chakra.TabList>
              <Chakra.Tab
                fontFamily={"Poppins"}
                fontSize={"16px"}
                fontWeight={"bold"}
                margin={"6px"}
                _hover={{
                  background: "var(--color1-3)",
                  color: "var(--color5)",
                  transform: "translateY(-4px)",
                }}
              >
                Tecnicas <ChevronDownIcon />
              </Chakra.Tab>

              <Chakra.Tab
                fontFamily={"Poppins"}
                fontSize={"16px"}
                fontWeight={"bold"}
                margin={"6px"}
                _hover={{
                  background: "var(--color1-3)",
                  color: "var(--color5)",
                  transform: "translateY(-4px)",
                }}
              >
                Categorías <ChevronDownIcon />
              </Chakra.Tab>

              <Chakra.Tab
                fontFamily={"Poppins"}
                fontSize={"16px"}
                fontWeight={"bold"}
                margin={"6px"}
                _hover={{
                  background: "var(--color1-3)",
                  color: "var(--color5)",
                  transform: "translateY(-4px)",
                }}
              >
                Soporte <ChevronDownIcon />
              </Chakra.Tab>
            </Chakra.TabList>

            <Chakra.TabPanels>
              <Chakra.TabPanel>
                <Components.CheckboxGroup
                  options={techniques}
                  value={filters.techniques}
                  onChange={handleTechniqueOnChange}
                  colorScheme={"lotus"}
                  bgColor={"var(--color5)"}
                  borderRadius={"1rem"}
                  p={"1rem"}
                />
              </Chakra.TabPanel>

              <Chakra.TabPanel>
                <Components.CheckboxGroup
                  options={categories}
                  value={filters.categories}
                  onChange={handleCategoryOnChange}
                  colorScheme={"lotus"}
                  bgColor={"var(--color5)"}
                  borderRadius={"1rem"}
                  p={"1rem"}
                />
              </Chakra.TabPanel>

              <Chakra.TabPanel>
                <Components.CheckboxGroup
                  options={supports}
                  value={filters.supports}
                  onChange={handleSupportOnChange}
                  colorScheme={"lotus"}
                  bgColor={"var(--color5)"}
                  borderRadius={"1rem"}
                  p={"1rem"}
                />
              </Chakra.TabPanel>
            </Chakra.TabPanels>
          </Chakra.Tabs>
        ) : (
          <Chakra.Accordion allowToggle fontFamily={"Poppins"}>
            <Chakra.AccordionItem>
              <Chakra.AccordionButton
                fontSize={"16px"}
                fontWeight={"bold"}
                margin={"6px 0"}
                bgColor="var(--color3)"
                color={"var(--black)"}
                borderRadius={"100px"}
                display={"flex"}
                justifyContent={"space-between"}
                _focus={{
                  backgroundColor: "var(--color1)",
                  color: "var(--color5)",
                }}
              >
                <p>Tecnicas</p>
                <AccordionIcon transform={"scale(1.5)"} />
              </Chakra.AccordionButton>

              <Chakra.AccordionPanel>
                <Components.CheckboxGroup
                  options={techniques}
                  value={filters.techniques}
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
                fontSize={"16px"}
                fontWeight={"bold"}
                margin={"6px 0"}
                bgColor="var(--color3)"
                color={"var(--black)"}
                borderRadius={"100px"}
                display={"flex"}
                justifyContent={"space-between"}
                _focus={{
                  backgroundColor: "var(--color1)",
                  color: "var(--color5)",
                }}
              >
                <p>Categorias...</p>
                <AccordionIcon transform={"scale(1.5)"} />
              </Chakra.AccordionButton>

              <Chakra.AccordionPanel>
                <Components.CheckboxGroup
                  options={categories}
                  value={filters.categories}
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
                fontSize={"16px"}
                fontWeight={"bold"}
                margin={"6px 0"}
                bgColor="var(--color3)"
                color={"var(--black)"}
                borderRadius={"100px"}
                display={"flex"}
                justifyContent={"space-between"}
                _focus={{
                  backgroundColor: "var(--color1)",
                  color: "var(--color5)",
                }}
              >
                <p>Soportes</p>
                <AccordionIcon transform={"scale(1.5)"} />
              </Chakra.AccordionButton>

              <Chakra.AccordionPanel>
                <Components.CheckboxGroup
                  options={supports}
                  value={filters.supports}
                  onChange={handleSupportOnChange}
                  colorScheme={"lotus"}
                  bgColor={"var(--color5)"}
                  borderRadius={"1rem"}
                  p={"1rem"}
                />
              </Chakra.AccordionPanel>
            </Chakra.AccordionItem>
          </Chakra.Accordion>
        )}

        <Chakra.Flex
          justify={"center"}
          flexWrap={"wrap"}
          fontFamily={"Poppins"}
          margin={"12px 0"}
        >
          <Chakra.Button
            width={"100%"}
            maxW={"220px"}
            m={"6px"}
            borderRadius={"100px"}
            fontSize={"16px"}
            onClick={handleOnFilter}
            bgColor="var(--color1)"
            color={"var(--white)"}
            _hover={{
              backgroundColor: "var(--color1-3)",
              transform: "translateY(-4px)",
            }}
          >
            Filtrar
          </Chakra.Button>
          <Chakra.Button
            width={"100%"}
            maxW={"220px"}
            m={"6px"}
            borderRadius={"100px"}
            fontSize={"16px"}
            onClick={handleOnClickResetFilters}
            bgColor="var(--color1)"
            color={"var(--white)"}
            _hover={{
              backgroundColor: "var(--color1-3)",
              transform: "translateY(-4px)",
            }}
          >
            Reiniciar Filtros
          </Chakra.Button>
        </Chakra.Flex>
        <Components.CardContainer cards={filteredArtworks.data} />
      </Chakra.Box>
    </div>
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

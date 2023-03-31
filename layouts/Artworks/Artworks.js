import * as Chakra from "@chakra-ui/react";
import { AccordionIcon } from "@chakra-ui/react";
import { useState } from "react";
import * as Components from "../../components";
import * as ArtworksMocks from "../../helpers/mocks/layouts_mock/Artworks_mock";

function Artworks({
  artworks = ArtworksMocks.artworks_mock,
  techniques = ArtworksMocks.techniques_mock,
  categories = ArtworksMocks.categories_mock,
}) {
  const [selectedTechniques, setSelectedTechniques] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  function handleTechniqueOnChange(event) {
    console.log(event);
    setSelectedTechniques(event);
  }

  function handleCategoryOnChange(event) {
    console.log(event);
    setSelectedCategories(event);
  }

  function handleOnFilter(event) {
    event.preventDefault();
    console.log("Selected Techniques: ", selectedTechniques);
    console.log("Selected Categories: ", selectedCategories);
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
        <Chakra.Button onClick={handleOnFilter}>Filter</Chakra.Button>
      </Chakra.Accordion>
    </Chakra.Box>
  );
}

export default Artworks;

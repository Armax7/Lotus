import React, { useState } from "react";
import { Box, Image, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const images = [
  "https://picsum.photos/300/200?random=1",
  "https://picsum.photos/300/200?random=2",
  "https://picsum.photos/300/200?random=3",
  "https://picsum.photos/300/200?random=4",
  "https://picsum.photos/300/200?random=5",
];

const Carousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  const handlePrevClick = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };

  const handleNextClick = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };

  return (
    <Box position="relative" margin="20px">
      <Box
        position="absolute"
        left="0"
        width="50%"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
      >
        <Image src={images[currentImage]} objectFit="cover" height="400px" />

        {showArrows && (
          <>
            <IconButton
              aria-label="Previous Image"
              icon={<ChevronLeftIcon />}
              position="absolute"
              top="50%"
              left="4"
              transform="translateY(-50%)"
              onClick={handlePrevClick}
              style={{ transition: "all 0.5s", opacity: 0.5 }} // agregar estilo de transición
            />

            <IconButton
              aria-label="Next Image"
              icon={<ChevronRightIcon />}
              position="absolute"
              top="50%"
              right="4"
              transform="translateY(-50%)"
              onClick={handleNextClick}
              style={{ transition: "all 0.5s", opacity: 0.5 }}// agregar estilo de transición
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Carousel;

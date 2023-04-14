import React, { useState } from "react";
import { Box, Image, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Carousel = ({ images, ...props }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showArrows, setShowArrows] = useState(true);

  const handlePrevClick = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };

  const handleNextClick = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };

  return (
    <Box
      width={"100%"}
      minW={"296px"}
      maxW={"680px"}
      height={"100vh"}
      minH={"440px"}
      maxH={"480px"}
      position="relative"
      // onMouseEnter={() => setShowArrows(true)}
      // onMouseLeave={() => setShowArrows(false)}
    >
      <Image
        src={images[currentImage]}
        objectFit={"cover"}
        borderRadius="12px"
        width="100%"
        height="100%"
      />

      {showArrows && images.length > 1 && (
        <>
          <IconButton
            aria-label="Previous Image"
            fontSize={"32px"}
            icon={<ChevronLeftIcon />}
            position="absolute"
            top="50%"
            left="0"
            h={"100%"}
            transform="translateY(-50%)"
            onClick={handlePrevClick}
            bg={"var(--black-2)"}
            color={"var(--color5)"}
            borderRadius="12px 0 0 12px"
            _hover={{background:"var(--color1-2)", fontSize:"36px"}}
          />

          <IconButton
            aria-label="Next Image"
            fontSize={"32px"}
            icon={<ChevronRightIcon />}
            position="absolute"
            top="50%"
            right="0"
            h={"100%"}
            transform="translateY(-50%)"
            onClick={handleNextClick}
            bg={"var(--black-2)"}
            color={"var(--color5)"}
            borderRadius="0 12px 12px 0"
            _hover={{background:"var(--color1-2)", fontSize:"36px"}}
          />
        </>
      )}
    </Box>
  );
};

export default Carousel;

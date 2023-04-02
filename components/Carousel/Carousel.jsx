import React, { useState } from "react";
import { Box, Image, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";



const Carousel = ({images, ...props}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  const handlePrevClick = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };

  const handleNextClick = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };

  return (
    
      <Box
        position="relative"
        flex="1"
        left="0"
        width="30%"
        marginRight="15px"
        height="500px"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
      >
        <Image src={images[currentImage]} objectFit="cover" borderRadius= "3px" width= "100%" height="100%" />

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
              style={{ opacity: 0.2 }} 
            />

            <IconButton
              aria-label="Next Image"
              icon={<ChevronRightIcon />}
              position="absolute"
              top="50%"
              right="4"
              transform="translateY(-50%)"
              onClick={handleNextClick}
              style={{opacity: 0.2 }}
            />
          </>
        )}
      </Box>
    
  );
};

export default Carousel;

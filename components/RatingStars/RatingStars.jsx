import { useState } from "react"
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import { Flex } from "@chakra-ui/react"

const RatingStars = ({ratingDb, rate}) => {
  const [rating, setRating] = useState(ratingDb)
  const [hoverRating, setHoverRating] = useState(0)

  const handleMouseEnter = (rating) => {
    setHoverRating(rating)
  }

  const handleMouseLeave = () => {
    setHoverRating(0)
  }

  const handleClick = (rating) => {
    setRating(rating)
  }

  const renderStar = (rating, index) => {
    if (rating >= index + 1) {
      return <FaStar key={index} color="orange" onMouseEnter={() => handleMouseEnter(index + 1)} onMouseLeave={() => handleMouseLeave()} onClick={() => handleClick(index + 1)} />
    } else if (rating >= index + 0.5) {
      return <FaStarHalfAlt key={index} color="orange" onMouseEnter={() => handleMouseEnter(index + 0.5)} onMouseLeave={() => handleMouseLeave()} onClick={() => handleClick(index + 0.5)} />
    } else {
      return <FaStar key={index} color="gray" onMouseEnter={() => handleMouseEnter(index + 1)} onMouseLeave={() => handleMouseLeave()} onClick={() => handleClick(index + 1)} />
    }
  }

  return (
    <>
      {rate ? (
        <Flex marginTop="50px" fontSize="30px">
          {[...Array(5)].map((_, index) => renderStar(hoverRating || rating, index))}
        </Flex>
      ) : (
        <Flex marginTop="50px" fontSize="30px">
          {[...Array(ratingDb)].map((_, index) => <FaStar key={index} color="orange" />)}
        </Flex>
      )}
    </>
  );
}

export default RatingStars
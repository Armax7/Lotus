import React, { useState } from "react";
import * as QueryFns from "../../helpers/page_helpers/Home_helpers/query_fn"
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  Flex,
  Box,
} from "@chakra-ui/react";


const postReview = async (userId, artworkId, rating, commments) => {
  await QueryFns.postReview(userId, artworkId, rating, commments)
}

export default function ReviewModal({ userId, artworkId, isOpen, onClose, onSubmit }) {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  
  const handleSubmit = async () => {
    await postReview(userId, artworkId, rating, comment); 
    onClose();
    onSubmit();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dejanos una valoración</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="rating">
            <FormLabel>Calificacion</FormLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value={1}>1 estrella</option>
              <option value={2}>2 estrellas</option>
              <option value={3}>3 estrellas</option>
              <option value={4}>4 estrellas</option>
              <option value={5}>5 estrellas</option>
            </Select>
          </FormControl>
          <FormControl id="comment" mt={4}>
            <FormLabel>Comentario</FormLabel>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </FormControl>
          <Flex justifyContent="flex-end" mt={4}>
            <Box>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </Box>
            <Box>
              <Button colorScheme="blue" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

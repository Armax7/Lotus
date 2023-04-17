import { useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Icon, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, Textarea } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const EditOpinion = ({ id, isOpen, onClose, initialRating, initialComment, onSave, handleUpdate }) => {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);

  const handleRatingClick = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSaveClick = () => {
    handleUpdate(id, rating, comment );
    onSave()
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar opinión</ModalHeader>
        <ModalBody>
          <Box mb={4}>
            <Text fontWeight="bold" mr={2}>Calificación:</Text>
            <Flex alignItems="center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  as={StarIcon}
                  color={star <= rating ? "yellow.500" : "gray.300"}
                  boxSize={[4, 6]}
                  cursor="pointer"
                  onClick={() => handleRatingClick(star)}
                  _hover={{ color: "yellow.500" }}
                  mr={2}
                />
              ))}
            </Flex>
          </Box>
          <FormControl mb={4}>
            <FormLabel>Comentario:</FormLabel>
            <Textarea value={comment} onChange={handleCommentChange} />
          </FormControl>
          <Flex justifyContent="flex-end">
            <Button mr={4} onClick={onClose}>Cancelar</Button>
            <Button colorScheme="green" onClick={handleSaveClick}>Guardar cambios</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
    )
  
};

export default EditOpinion;

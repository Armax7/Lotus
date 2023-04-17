import { Avatar, Badge, Box, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { StarIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import * as Components from "../../components"
import { useEffect, useState } from "react";
import { getUserId, loggedStatus } from "../../helpers/supabase_helpers/user_management"


const Opinion = ({ name, rating, date,user_id, comment, imageUrl, id, handleDelete, handleUpdate}) => {
  const stars = [];
  const datePut = date.split("T")[0]
  const [isOpen, setIsOpen] = useState(false);
  const [isLog, setIsLog] = useState(false);
  const [userId, setUserId] = useState();

  async function isLogged(){
    const result = await loggedStatus();
    const id = await getUserId();
    if(!result || !id){
      return false; 
    } else {
      console.log(id + " " + result)
    setIsLog(result);
    setUserId(id);
    }
  }

  function onClose() {
    setIsOpen(false);
  }

 async function onSave() {
    
    setIsOpen(false);
  }

  useEffect(() =>{
   isLogged();
  }, [])

  
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Icon
        key={i}
        as={StarIcon}
        color={i <= rating ? "yellow.500" : "gray.300"}
        boxSize={[4, 6]}
      />
    );
  }



  return (
    <Box
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    p={4}
    margin="20px"
    width="450px"
    height="200px"
    position="relative"
  >
    <Flex alignItems="center" flexWrap="wrap">
      <Avatar size="md" name={name} src={imageUrl} mr={4} />
      <Box flex="1">
        <Box display="flex" alignItems="baseline">
          <Text fontWeight="bold" mr={2}>{name}</Text>
          <Badge colorScheme="green" variant="subtle">{datePut}</Badge>
        </Box>
        <Flex alignItems="center">
          {stars}
          
        </Flex>
      </Box>
    </Flex>
    <Text mt={4}>{comment}</Text>
    { isLog && userId === user_id ? <Flex position="absolute" top={0} right={0} mt={2} mr={2}>
      <IconButton
        icon={<Icon as={EditIcon} />}
        aria-label="Editar opinión"
        variant="ghost"
        size="sm"
        mr={2}
        onClick={() => setIsOpen(true)}
      />
      <Components.EditOpinion
        isOpen={isOpen}
        onClose={onClose}
        initialRating={rating}
        initialComment={comment}
        onSave={onSave}
        handleUpdate={handleUpdate}
        id={id}
      />
      <IconButton
        icon={<Icon as={DeleteIcon} />}
        aria-label="Eliminar opinión"
        variant="ghost"
        size="sm"
        onClick={() => handleDelete(id)}
      />
    </Flex>
  : null  
  }
  </Box>
  
  
  );
};

export default Opinion;

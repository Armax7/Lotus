import React, { useState } from "react";
import { Box, Grid, Table, Tr, Td, Th, Tbody, Thead, Image, IconButton } from "@chakra-ui/react";
import { ChatIcon, CheckCircleIcon } from "@chakra-ui/icons";
import * as Components from "../../components";

const CardOrder = ({ purchases }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  function onClose() {
    setIsOpen(false);
  }

  function onSubmit() {
    setIsSubmit(true);
  }

  return (
    <Box p="4">
      <Table>
        <Thead>
          <Tr>
            <Th fontWeight="semibold">Imagen</Th>
            <Th fontWeight="semibold">Nombre</Th>
            <Th fontWeight="semibold">Cantidad</Th>
            <Th fontWeight="semibold">Total</Th>
            <Th fontWeight="semibold">Valoracion</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {purchases.map((purchase, index) => (
            <Tr key={index}>
              <Td>
                <Image src={purchase.image} boxSize="80px" objectFit="cover" />
              </Td>
              <Td>{purchase.name}</Td>
              <Td>{purchase.quantity}</Td>
              <Td>${purchase.price * purchase.quantity}</Td>
              {!isSubmit ? (
                <Td>
                  <IconButton
                    aria-label="Add comment"
                    icon={<ChatIcon />}
                    size="sm"
                    variant="outline"
                    onClick={() => setIsOpen(true)}
                  />
                  <Components.ReviewModal artworkId={purchase.id} userId={purchase.userId} onSubmit={onSubmit} isOpen={isOpen} onClose={onClose} />
                </Td>
              ) : (
                <Td>
                  <CheckCircleIcon color="green.500" />
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CardOrder;

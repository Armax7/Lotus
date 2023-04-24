import React, { useEffect, useState } from "react";
import {Box, Heading, Flex, Text } from "@chakra-ui/react"
import * as Components from "../../components"

const CardOrderContainer = ({ order, ...props }) => {
  const date = order.created_at.split("T")[0];
  const status = order.payment_status == "paid" ? "PAGO" : null;
  const total = order.amount_total / 100;

  return (
    <Box
      mx="20px"
      borderWidth="3px"
      borderRadius="lg"
      p="4"
      color="black"
      borderColor="black"
    >
      <Components.CardOrder purchases={order.artworks_cart} />

      <Flex justifyContent="space-between" alignItems="center" mt="4">
        <Text ml="4" color="gray.600">
          {date}
        </Text>
        <Text ml="4">Status: {status}</Text>
        <Text>Total: ${total}</Text>
      </Flex>
    </Box>
  );
};

export default CardOrderContainer;

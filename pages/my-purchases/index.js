import { useState, useEffect } from 'react';
import {Heading, Alert, AlertIcon, AlertTitle, AlertDescription} from "@chakra-ui/react";
import axios from 'axios';
import React from "react";
import * as Components from "../../components";
import * as SupaHelpers from "../../helpers/supabase_helpers/user_management"

function MyPurchases() {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState("");

  async function getId (){
    const id = await SupaHelpers.getUserId()
    setUserId(id)
  }

  useEffect(() => {
    getId()
  }, []);

  useEffect(() => {
    if (userId) {
      axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/order-details?user_id=${userId}`)
        .then(response => setOrders(response.data))
        .catch(error => console.log(error));
    }
  }, [userId]);

  return (
    <div style={{backgroundColor:"#f9f5e7"}}>
      <Heading as="h1" size="xl">Mis Compras</Heading>
      {orders.length ? orders.map((order) => {
        return <Components.CardOrderContainer key={order.id} order={order} /> 
      }):  
      <Alert
      backgroundColor="#f9f5e7"
      status="warning"
      justifyContent="center"
      flexDirection="column"
      h={"100vh"}
      minH={"400px"}
      maxH="calc(100vh - 235px)"
      fontFamily={"Poppins"}
    >
      <AlertIcon boxSize={"60px"} mr={0} />
      <AlertTitle lineHeight={"60px"} fontSize="4xl" textAlign="center">
        No hay productos en tus compras
      </AlertTitle>
      <AlertDescription
        fontSize="xl"
        textAlign="center"
        color={"var(--color1)"}
      >
        Realiza una compra para que veas aqui el detalle de la misma.
      </AlertDescription>
    </Alert>}
    </div>
  );
}

export default MyPurchases;

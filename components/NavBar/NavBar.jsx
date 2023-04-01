import Link from "next/link";
import { useRouter } from "next/router";
import * as Chakra from "@chakra-ui/react";


import { FaShoppingCart } from "react-icons/fa";

function NavBar({ classname, ...props }) {
  const router = useRouter();

  return (
<div style={{width:"100%",
backgroundColor:"#F8EAD8" ,
padding:"5px",


}}> 


    <Chakra.Box maxW="1700px"
    margin="auto" 
    pt="20px"
    >
     
 
      
 
      <Chakra.Tabs isFitted variant="solid-rounded"  colorScheme="teal">
        
  <Chakra.TabList mb='2em'   bgRepeat="no-repeat"
     height="10"
     bgPos="initial" 
     pr="80px"
     variant='solid' borderColor='#F8EAD8' 

     >
     
  <img src= "/lotusIsotipo.svg"  style={{ marginRight: "30px" }} />
  
 
  <Chakra.Tab  borderColor="#A7727D" >Home</Chakra.Tab>
    
    <Chakra.Tab borderColor="#A7727D" >Cuadros</Chakra.Tab>
   
    <Chakra.Tab borderColor="#A7727D" > Carrito{" "}
            <Chakra.Icon as={FaShoppingCart} ml={2} color="red.500" /></Chakra.Tab>
            <Chakra.Button bgColor="#F9F5E7"  _hover={{ bgColor: "#D3C0AF" }} 
             color={router.pathname === '/search' ? 'black' : 'black'}
             borderRadius= "0px"  border= "2px" solid borderColor="black" ml = "30px" mr="30px">
          Crea tu cuenta
        </Chakra.Button >
        <Chakra.Button bgColor="#F9F5E7" _hover={{ bgColor: "#D3C0AF" }} 
         color={router.pathname === '/search' ? 'black' : 'black'}
         borderRadius= "0px"  border= "2px" solid borderColor="black">
          Iniciar sesión
        </Chakra.Button>
  </Chakra.TabList>
  <Chakra.TabPanels>

  <Chakra.TabPanel> </Chakra.TabPanel>


    <Chakra.TabPanel>
     
      <p>Cuadro 1 </p>
      <p>Cuadro 2 </p>
      <p>Cuadro 3 </p>
      <p>Cuadro 4 </p>
    </Chakra.TabPanel>
   
    <Chakra.TabPanel>
      <p>Carrito!</p>
    </Chakra.TabPanel>
    
  </Chakra.TabPanels>
</Chakra.Tabs>

   
    </Chakra.Box>
    </div>
    
  );
}

export default NavBar;

import * as Chakra from "@chakra-ui/react";
import { BsPencilSquare } from "react-icons/bs";
import { BiPhone } from "react-icons/bi";
import * as SupaHelpers from "../../helpers/supabase_helpers/user_management";
import React, { useEffect, useState } from "react";
import style from "./FormDrawerData.module.css";
import axios from "axios";

function FormDrawerData() {
  const { isOpen, onOpen, onClose } = Chakra.useDisclosure();
  const btnRef = React.useRef();

  const [uuid, setUuid] = useState("");

  const [info, setInfo] = useState({});
  const [newData, setNewData] = useState({
    id: uuid,
    name: info?.name,
    address: info?.address,
    image: info?.image,
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!uuid) {
        return;
      }

      let allUsers = await axios
        .get(`${process.env.NEXT_PUBLIC_HOST}/api/user-details`)
        .then((res) => res.data);
      let user = allUsers.filter((u) => u.id == uuid)[0];
      setInfo(user);
    };

    fetchUserDetails();
  }, [uuid]);

  useEffect(() => {
    const fetchUuid = async () => {
      const uuid = await SupaHelpers.getUserId();
      setUuid(uuid);
    };

    fetchUuid();
  }, []);

  //Funciones para agarrar los datos de los inputs
  const handleChange = (event) => {
    event.preventDefault();
    setNewData({ ...newData, [event.target.name]: event.target.value });
  };

  //Funciones para los botones
  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!uuid) {
      console.log("El valor de uuid es nulo o indefinido");
      return;
    }
    await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user-details`, {
      id: uuid,
      name: newData.name,
      address: newData.address,
      image: newData.image,
    });
    if (event.target instanceof HTMLFormElement) {
      event.target.reset();
    }
    window.location.reload();
  };
  //Fin Funciones para los botones

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      setNewData({ ...newData, image: reader.result });
    };
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Enviar el archivo seleccionado al servidor
    // ...
  };

  return (
    <>
      <Chakra.Button
        ref={btnRef}
        onClick={onOpen}
        color="black"
        borderRadius="full"
        w="50px"
        h="50px"
      >
        <BsPencilSquare />
      </Chakra.Button>
      <form onSubmit={handleSubmit}>
        <Chakra.Drawer isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef}>
          <Chakra.DrawerOverlay />
          <Chakra.DrawerContent>
            <Chakra.DrawerCloseButton />

            <Chakra.DrawerHeader>Formulario de datos</Chakra.DrawerHeader>

            <Chakra.DrawerBody className={style.drawerBody}>
              <Chakra.FormControl id="name" mb="4">
                <Chakra.FormLabel>Nombre</Chakra.FormLabel>
                <Chakra.Input
                  type="text"
                  name="name"
                  value={newData.name || ""}
                  onChange={handleChange}
                />
              </Chakra.FormControl>

              <Chakra.FormControl id="address" mb="4">
                <Chakra.FormLabel>Dirección</Chakra.FormLabel>
                <Chakra.Input
                  name="address"
                  value={newData.address || ""}
                  onChange={handleChange}
                />
              </Chakra.FormControl>
            </Chakra.DrawerBody>

            <Chakra.DrawerFooter>
              <Chakra.Button variant="outline" mr={3} onClick={onClose}>
                Cancelar
              </Chakra.Button>
              <Chakra.Button colorScheme="blue" onClick={handleUpdate}>
                Actualizar
              </Chakra.Button>
            </Chakra.DrawerFooter>
          </Chakra.DrawerContent>
        </Chakra.Drawer>
      </form>
    </>
  );
}
export default FormDrawerData;

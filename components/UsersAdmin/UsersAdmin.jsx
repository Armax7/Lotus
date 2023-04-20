import * as SupaHelpers from "../../helpers/supabase_helpers/user_management";
import * as Chakra from "@chakra-ui/react";
import * as Components from "../../components";
import React, { useEffect, useState, useRef } from "react";
import { supaAdmin, supabase } from "../../lib/supabaseClient";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

function UsersAdmin() {
  const [successMessage, setSuccessMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false); // Agregar estado para controlar el Alert
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [MailUsuarios, setMailUsuarios] = useState([]);

  console.log("MailUsuarios", MailUsuarios);

  const EmaiUsuarios = async () => {
    let data = await SupaHelpers.getAllUsersEmail();
    const emails = data.map((user) => user.email);
    console.log("emails", emails);
    setMailUsuarios(data);
  };

  useEffect(() => {
    EmaiUsuarios();
  }, []);

  const [allData, setAllData] = useState([]);
  console.log("allData", allData);

  const getAllData = async () => {
    try {
      let allUsers = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/user-details`
      );
      console.log(allUsers.data, "allUsers");
      return allUsers.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let info = await getAllData();

      setAllData(info);
    };

    fetchData();
  }, []);

  if (allData.length === 0 || MailUsuarios.length === 0) {
    return <div>Loading...</div>;
  }

  const userObject = {};
  allData.forEach((user) => {
    userObject[user.email] = user.name;
  });

  const data = allData.map((user) => {
    const mailUser = MailUsuarios.find((mail) => mail.id === user.id);
    return { ...user, email: mailUser?.email };
  });

  const handleDeleteUser = async (id) => {
    try {
     /* const { data:userDetails, error:userDetailsError} = await supabase
      .from("user_details")
      .delete()
      .eq("id",id) */
      const { data, error } = await supaAdmin.auth.admin.deleteUser(id)
      
      if (error) {
        throw error;
      }
//      if(userDetailsError){
// throw error;

//       }
      const updatedData = allData.filter((user) => user.id !== id);
      setAllData(updatedData);
      setUserToDelete(null); // resetear el usuario a eliminar
      setShowDeleteModal(false); // cerrar el modal
      setShowAlert(true);
      setSuccessMessage("El usuario se eliminó correctamente.");
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Nombre del usuario</Th>
          <Th>Email del usuario</Th>
          <Th>Rol del usuario</Th>
          <Th>Eliminar usuarios</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>
                <Chakra.Button
                  colorScheme="red"
                  onClick={() => {
                    setUserToDelete(user.id);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </Chakra.Button>
              </Td>
            </Tr>
          ))}
      </Tbody>

      {showDeleteModal && (
        <Chakra.Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
        >
          <Chakra.ModalOverlay />
          <Chakra.ModalContent>
            <Chakra.ModalHeader>Eliminar usuario</Chakra.ModalHeader>
            <Chakra.ModalCloseButton />
            <Chakra.ModalBody>
              ¿Está seguro que desea eliminar al usuario seleccionado?
            </Chakra.ModalBody>
            <Chakra.ModalFooter>
              <Chakra.Button
                colorScheme="red"
                mr={3}
                onClick={() => handleDeleteUser(userToDelete)}
              >
                Sí
              </Chakra.Button>
              <Chakra.Button
                variant="ghost"
                onClick={() => setShowDeleteModal(false)}
              >
                No
              </Chakra.Button>
            </Chakra.ModalFooter>
          </Chakra.ModalContent>
        </Chakra.Modal>
      )}

      {showAlert && (
        <Chakra.Alert
          status="success"
          justifyContent="center"
          alignItems="center"
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="9999"
          variant="subtle"
          flexDirection="column"
          width="300px" // establecemos un ancho para hacerlo cuadrado
          maxW="90vw" // ajustamos el ancho máximo para evitar que ocupe toda la pantalla
          height="300px" // establecemos una altura para hacerlo cuadrado
          maxH="90vh"
          textAlign="center"
        >
          <Chakra.AlertIcon />
          El usuario ha sido eliminado exitosamente.
        </Chakra.Alert>
      )}
    </Table>
  );
}

export default UsersAdmin;

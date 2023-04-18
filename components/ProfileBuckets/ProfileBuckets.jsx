import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import * as SupaHelpers from "../../helpers/supabase_helpers/user_management";
import styles from "./ProfileBuckets.module.css";
import axios from "axios";
import * as Chakra from "@chakra-ui/react";
import Link from "next/link";

export const PATH = {
  path: "",
};

const ProfileBuckets = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  console.log("selectedFile", selectedFile);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userID, setUserID] = useState("");
  console.log("userID", userID);
  useEffect(() => {
    async function fetchData() {
      const id = await SupaHelpers.getUserId();
      setUserID(id);
    }
    fetchData();
  }, []);

  const handleUpload = async () => {
    setLoading(true); // enable spinner
    const fileInput = document.getElementById("file_input");
    fileInput.value = "";
    const fileName = `${userID}/profile/${Date.now()}-${selectedFile?.name}`;
    const { data, error } = await supabase.storage

      .from("Image_Client")
      .upload(fileName, selectedFile);
    if (data) {
      console.log("este es data ", data);
      await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user-details`, {
        id: userID,
        image: data.path,
      });
      console.log("userID", userID);
      console.log("data.path", data.path);
      PATH.path = data.path;
      setAlertType("success");
      setAlertMessage("Se subió el archivo correctamente.");

      window.location.reload();
    } else if (error) {
      console.log(error);
      setAlertType("error");
      setAlertMessage(error.message);
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById("file_input");
    fileInput.value = "";
  };

  return (
    <div className={styles.container}>
      <Chakra.Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginBottom="20px"
      >
        {loading && (
          <Chakra.Spinner
            marginRight="10px"
            flexShrink={0}
            emptyColor="#A7727D"
            color="purple"
            size="xl"
          />
        )}
        {alertType && (
          <Chakra.Alert status={alertType} variant="top-accent">
            <Chakra.AlertIcon boxSize="40px" mr={5} />
            {alertMessage}
          </Chakra.Alert>
        )}
      </Chakra.Box>

      <input
        type="file"
        id="file_input"
        name="file_input"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => {
          setSelectedFile(e.target.files[0]);
        }}
        className={styles.fileInput}
      />
      {selectedFile && (
        <div className={styles.selectedFile}>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Archivo seleccionado"
            className={styles.selectedFileImg}
          />
          <Chakra.Flex justifyContent={"space-evenly"}>
            <Chakra.Button
              onClick={handleDeleteClick}
              className={styles.selectedFileButton}
              bgColor="var(--color1)"
              color="var(--color5)"
              _hover={{ transform: "translateY(-4px)" }}
            >
              Borrar
            </Chakra.Button>
            <Chakra.Button
              onClick={handleUpload}
              className={styles.selectedFileButton}
              bgColor="var(--color2)"
              color="var(--color5)"
              _hover={{ transform: "translateY(-4px)" }}
            >
              Subir
            </Chakra.Button>
          </Chakra.Flex>
        </div>
      )}
    </div>
  );
};

export default ProfileBuckets;

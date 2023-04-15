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
    const { data, error } = await supabase.storage
      .from("Image_Client")
      .upload(`${userID}/profile/` + selectedFile?.name, selectedFile);

    if (data) {
      console.log("este es data ", data);
      await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/user-details`, {
        id: userID,
        image: data.path,
      });
      console.log("userID", userID);
      console.log("data.path", data.path);
      PATH.path = data.path;
      alert("Se subio el archivo correctamente");
      window.location.reload(); // Recargar la página
    } else if (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleDeleteClick = () => {
    setSelectedFile(null);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="file" className={styles.fileInput}>
        Choose an image
      </label>
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
          <Chakra.Button
            onClick={handleDeleteClick}
            className={styles.selectedFileButton}
            bgColor="red"
          >
            {" "}
            Borrar{" "}
          </Chakra.Button>
          <Chakra.Button
            onClick={handleUpload}
            handleDeleteClick
            className={styles.selectedFileButton}
            bgColor="green"
          >
            {" "}
            Subir{" "}
          </Chakra.Button>
        </div>
      )}
    </div>
  );
};

export default ProfileBuckets;

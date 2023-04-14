import * as Chakra from "@chakra-ui/react";
import * as SupaHelpers from "../../helpers/supabase_helpers/user_management";

import { useEffect, useState } from "react";

import axios from "axios";
import { PATH } from "../../components/ProfileBuckets/ProfileBuckets.jsx";
import * as Components from "../../components";
import style from "../../styles/profile.module.css";

//import style from "./profile.module.css";

const Profile = ({
  avatarImage = "https://img.freepik.com/iconos-gratis/pintura_318-784046.jpg?w=2000",
}) => {
  const [myUuid, setMyUuid] = useState("");

  //aca esta el usuario filtrado por id.
  const [allData, setAllData] = useState({});

  const [userData2, setUserData2] = useState(null);

  const [path, setPath] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAllData = async () => {
    let allUsers = (await axios.get("http://localhost:3000/api/user-details"))
      .data;

    return allUsers;
  };

  const datosUsuario2 = async () => {
    let users = await SupaHelpers.getUser();
    setUserData2(users);
  };
  useEffect(() => {
    datosUsuario2();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let uuid = await SupaHelpers.getUserId();

      setMyUuid(uuid);

      let info = await getAllData();
      let user = info?.filter((u) => u.id == uuid).at(0);
      console.log("🚀 ~ file: index.js:53 ~ fetchData ~ user:", user);

      setAllData(user);
    };

    fetchData();
  }, [path]);

  return (
    <Chakra.Flex w="100%" h="100vh" margin="auto" justifyContent="center">
      <Chakra.Flex
        height="90vh"
        margin="auto"
        flexDirection="column"
        width="45%"
        alignItems="center"
      >
        <Chakra.Flex width="80%">
          <Components.FormDrawerData />
        </Chakra.Flex>
        <Chakra.Container
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          marginTop="15%"
        >
          <Chakra.Image
            src={
              allData?.image
                ? `https://sppydtsxdhpyuhwzppca.supabase.co/storage/v1/object/public/Image_Client/${allData.image}`
                : avatarImage
            }
            alt="IMAGEN"
            borderRadius="full"
            width="230px"
            height="230px"
            className={style.stylesImg}
            onClick={() => setIsModalOpen(true)}
          />
          {/** */}
          <Chakra.Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            <Chakra.ModalOverlay />
            <Chakra.ModalContent>
              <Chakra.ModalHeader>Seleccionar imagen</Chakra.ModalHeader>
              <Chakra.ModalCloseButton />
              <Chakra.ModalBody>
                <Components.ProfileBuckets />
              </Chakra.ModalBody>
            </Chakra.ModalContent>
          </Chakra.Modal>
          {/** */}
          <Chakra.Container>
            <Chakra.Text
              textAlign="center"
              fontSize="42px"
              color="black"
              fontWeight="bold"
              textDecoration="underline"
            >
              {`${allData?.name ? allData.name : ""}`}
              {`${userData2?.name ? userData2.user_metadata?.name : ""}`}
            </Chakra.Text>
          </Chakra.Container>
        </Chakra.Container>
      </Chakra.Flex>
      <Chakra.Flex
        flexDirection="column"
        width="55%"
        justifyContent="center"
        alignItems="center"
        padding="0 2%"
        h="100vh"
      >
        <Chakra.Flex
          margin="auto"
          width="100%"
          height="40%"
          background="rgb(217,217,217, 40%)"
          borderRadius="20px"
        >
          <Chakra.Flex
            flexDirection="column"
            w="95%"
            border="1px"
            borderColor="blue.500"
            color="white"
            fontSize="20px"
            fontWeight="bold"
            margin="auto"
            padding="25px"
            borderRadius="15px"
          >
            <Chakra.Text color="black">▪ Nombre: {allData?.name}</Chakra.Text>
            <Chakra.Text color="black">
              ▪ Direccion: {allData?.address}
            </Chakra.Text>
          </Chakra.Flex>
        </Chakra.Flex>
      </Chakra.Flex>
    </Chakra.Flex>
  );
};

export default Profile;

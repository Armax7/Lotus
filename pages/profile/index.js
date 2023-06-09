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
    let allUsers = await axios
      .get(`${process.env.NEXT_PUBLIC_HOST}/api/user-details`)
      .then((res) => res.data);

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

      setAllData(user);
    };

    fetchData();
  }, [path]);

  const [isLargerThan580] = Chakra.useMediaQuery("(min-width: 580px)");
  return (
    <div style={{ width: "100%", background: "var(--color5)" }}>
      <Chakra.Box
        w="100%"
        maxW={"1400px"}
        minH={"calc(100vh - 242px)"}
        margin="auto"
        fontFamily={"Poppins"}
        color={"var(--black)"}
      >
        <Chakra.Box
          w={"100%"}
          position={"relative"}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
        >
          <Chakra.Flex margin="auto" alignItems="center" p={"24px 12px 0"}>
            <Chakra.Box
              background={"var(--color3)"}
              borderRadius={"full"}
              padding={"12px"}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexWrap={"wrap"}
              zIndex={"100"}
            >
              <Chakra.Image
                src={
                  allData?.image
                    ? `https://sppydtsxdhpyuhwzppca.supabase.co/storage/v1/object/public/Image_Client/${allData.image}`
                    : avatarImage
                }
                alt="IMAGEN"
                borderRadius="full"
                width={isLargerThan580 ? "200px" : "120px"}
                height={isLargerThan580 ? "200px" : "120px"}
                objectFit={"cover"}
                className={style.stylesImg}
                onClick={() => setIsModalOpen(true)}
                border={"4px solid var(--color2)"}
                transition={"transform .2s"}
                _hover={{ transform: "translateY(-4px)" }}
                cursor={"pointer"}
              />
              <Chakra.Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                isCentered
              >
                <Chakra.ModalOverlay />
                <Chakra.ModalContent
                  background={"var(--color5)"}
                  borderRadius={"12px"}
                  maxW={"490px"}
                  color={"var(--black)"}
                >
                  <Chakra.ModalHeader>Seleccionar imagen</Chakra.ModalHeader>
                  <Chakra.ModalCloseButton
                    color={"var(--color2)"}
                    _hover={{ background: "var(--color1)" }}
                  />
                  <Chakra.ModalBody>
                    <Components.ProfileBuckets />
                  </Chakra.ModalBody>
                </Chakra.ModalContent>
              </Chakra.Modal>
              <Chakra.Box m={"0 12px"}>
                <Chakra.Text
                  width={"100%"}
                  maxW={"400px"}
                  fontSize="24px"
                  color="var(--color2)"
                  fontWeight="bold"
                  m={"4px 0"}
                >
                  {`${allData?.name ? allData.name : ""}`}
                  {`${userData2?.name ? userData2.user_metadata?.name : ""}`}
                </Chakra.Text>
                <Chakra.Box>
                  <Components.FormDrawerData />
                </Chakra.Box>
              </Chakra.Box>
            </Chakra.Box>
          </Chakra.Flex>

          <Chakra.Box
            margin={"0 auto"}
            width={"100%"}
            minH={"calc(100vh - 490px)"}
            p={"12px"}
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent={"space-evenly"}
          >
            <Chakra.Box
              width={"100%"}
              maxW={"600px"}
              minW={"300px"}
              display={"flex"}
              justifyContent={"center"}
              zIndex={"100"}
              background={"var(--color3-1)"}
              borderRadius={"12px"}
              margin={"12px 0"}
            >
              <Chakra.Box fontSize={"20px"}>
                <Chakra.Text
                  w={"100%"}
                  fontSize={"26px"}
                  fontWeight={"bold"}
                  color={"var(--black)"}
                  mb={"16px"}
                >
                  Informacion del usuario:
                </Chakra.Text>
                <Chakra.Text w={"100%"}>
                  <b style={{ color: "var(--color2)" }}>Nombre:</b>{" "}
                  {allData?.name}
                </Chakra.Text>
                <Chakra.Text w={"100%"}>
                  <b style={{ color: "var(--color2)" }}>Direccion:</b>{" "}
                  {allData?.address}
                </Chakra.Text>
              </Chakra.Box>
            </Chakra.Box>
          </Chakra.Box>
        </Chakra.Box>
      </Chakra.Box>
    </div>
  );
};

export default Profile;

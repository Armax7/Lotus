import style from "./Footer.module.css";
import * as Chakra from "@chakra-ui/react";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import * as Components from "../../components";

function Footer() {
  return (
    <>
      <svg
        id="wave"
        viewBox="0 0 1440 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{ background: "var(--color5)" }}
      >
        <path
          fill="var(--color1)"
          d="M0,20L30,16.7C60,13,120,7,180,15C240,23,300,47,360,50C420,53,480,37,540,38.3C600,40,660,60,720,68.3C780,77,840,73,900,60C960,47,1020,23,1080,16.7C1140,10,1200,20,1260,25C1320,30,1380,30,1440,31.7C1500,33,1560,37,1620,40C1680,43,1740,47,1800,55C1860,63,1920,77,1980,73.3C2040,70,2100,50,2160,50C2220,50,2280,70,2340,66.7C2400,63,2460,37,2520,33.3C2580,30,2640,50,2700,56.7C2760,63,2820,57,2880,45C2940,33,3000,17,3060,8.3C3120,0,3180,0,3240,13.3C3300,27,3360,53,3420,68.3C3480,83,3540,87,3600,85C3660,83,3720,77,3780,76.7C3840,77,3900,83,3960,71.7C4020,60,4080,30,4140,20C4200,10,4260,20,4290,25L4320,30L4320,100L4290,100C4260,100,4200,100,4140,100C4080,100,4020,100,3960,100C3900,100,3840,100,3780,100C3720,100,3660,100,3600,100C3540,100,3480,100,3420,100C3360,100,3300,100,3240,100C3180,100,3120,100,3060,100C3000,100,2940,100,2880,100C2820,100,2760,100,2700,100C2640,100,2580,100,2520,100C2460,100,2400,100,2340,100C2280,100,2220,100,2160,100C2100,100,2040,100,1980,100C1920,100,1860,100,1800,100C1740,100,1680,100,1620,100C1560,100,1500,100,1440,100C1380,100,1320,100,1260,100C1200,100,1140,100,1080,100C1020,100,960,100,900,100C840,100,780,100,720,100C660,100,600,100,540,100C480,100,420,100,360,100C300,100,240,100,180,100C120,100,60,100,30,100L0,100Z"
        ></path>
      </svg>
      <Chakra.Box
        as="footer"
        padding="0 22px 22px"
        background="var(--color1)"
        color="var(--color5)"
        fontFamily={"Poppins"}
        fontSize={"12px"}
      >
        <Chakra.Flex
          maxW={"1400px"}
          m="auto"
          justifyContent="space-between"
          flexWrap="wrap"
          cursor={"default"}
          textAlign="center"
        >
          <Chakra.Box minW="250px" textAlign="center" m="18px auto">
            <Chakra.Box>
              <hr className={style.hr} />
              <Chakra.Text fontSize="xl" fontWeight="bold">
                Ubicación
              </Chakra.Text>
              <Chakra.Text _hover={{ color: "var(--color3)" }} mt={"4px"}>
                Calle-00, Santiago, Metropolitana, Chile
              </Chakra.Text>
            </Chakra.Box>
          </Chakra.Box>

          <Chakra.Box minW="250px" textAlign="center" m="18px auto">
            <Chakra.Box>
              <hr className={style.hr} />
              <Chakra.Text fontSize="xl" fontWeight="bold" mb={"4px"}>
                Conócenos
              </Chakra.Text>
              <Components.AboutUs />
            </Chakra.Box>
          </Chakra.Box>

          <Chakra.Box minW="250px" textAlign="center" m="18px auto">
            <Chakra.List mb="2">
              <hr className={style.hr} />
              <Chakra.Text fontSize="xl" fontWeight="bold">
                Información
              </Chakra.Text>
              <Chakra.ListItem>
                <Components.ContactForm />
              </Chakra.ListItem>
              <Chakra.ListItem>
                <Chakra.Text _hover={{ color: "var(--color3)" }} mt={"4px"}>
                  {/* {Términos y condiciones} */}
                </Chakra.Text>
              </Chakra.ListItem>
            </Chakra.List>
          </Chakra.Box>

          <Chakra.Box minW="250px" textAlign="center" m="18px auto">
            <hr className={style.hr} />
            <Chakra.Text
              fontSize="xl"
              fontWeight="bold"
              _hover={{ color: "var(--color3)" }}
            >
              &copy; 2023, Lotus
            </Chakra.Text>
          </Chakra.Box>

          <Chakra.Box minW="250px" textAlign="center" m="18px auto">
            <hr className={style.hr} />
            <Chakra.Text fontSize="xl" fontWeight="bold">
              Redes Sociales
            </Chakra.Text>
            <Chakra.Flex padding={"20px"} justifyContent={"space-evenly"}>
              <a
                href="https://www.facebook.com/galeriadeartesolidario"
                target="_blank"
                className={style.smIcons}
              >
                <BsFacebook />
              </a>
              <a
                href="https://www.instagram.com/galeriadeartelotus/"
                target="_blank"
                className={style.smIcons}
              >
                <BsInstagram />
              </a>
            </Chakra.Flex>
          </Chakra.Box>
        </Chakra.Flex>
      </Chakra.Box>
    </>
  );
}

export default Footer;

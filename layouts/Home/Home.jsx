import * as Components from "../../components";
import styles from "../../styles/Home.module.css";
import * as Chakra from "@chakra-ui/react";

function Home({ artworks }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <img src="/lotusImagotipo.svg" alt="Loto" width={380} height={350}/>

        <p className={styles.description}>
          <code>
            SOMOS LOTUS Te ayudamos a convertir tu casa, departamento, oficina,
            dormitorio o el lugar que quieras, en tu espacio favorito.
          </code>
        </p>
        <Chakra.Box
          as="h1"
          textAlign="center"
          fontSize="3xl"
          fontWeight="bold"
          color="black"
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)"
          paddingTop="15px"
        >
          ✨CUADROS DESTACADOS DE NUESTRA SELECCIÓN✨
        </Chakra.Box>

        <Components.CardContainer cards={artworks} columns={3} />
      </main>
    </div>
  );
}

export default Home;

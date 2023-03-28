import { useRouter } from "next/router";

function ArtDetailById() {
  const router = useRouter();
  const { id } = router.query;
  return <h1>Esto el arte por ID {`${id}`}</h1>;
}

export default ArtDetailById;

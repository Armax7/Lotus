import axios from "axios";

export async function getAllArtworksAxios() {
  const response = await axios
    .get(`http://${process.env.NEXT_PUBLIC_HOST}/api/artworks`)
    .then((res) => res.data);

  return response;
}

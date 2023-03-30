import axios from "axios";

export async function getAllArtworksAxios() {
  const response = await axios
    .get("http://localhost:3000/api/artworks")
    .then((res) => res.data);

  return response;
}

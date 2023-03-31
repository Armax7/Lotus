import axios from "axios";
const port = process.env.NEXT_PUBLIC_HOST || "localhost:3000"


export async function getAllArtworksAxios() {
  const response = await axios
    .get(`${port}/api/artworks`)
    .then((res) => res.data);

  return response;
}

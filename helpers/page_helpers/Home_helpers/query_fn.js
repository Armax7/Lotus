import axios from "axios";

export async function getAllArtworksAxios() {
  const response = await axios
    .get(`${process.env.NEXT_PUBLIC_HOST}/api/artworks`)
    .then((res) => res.data);

  return response;
}
export async function getArtworkById(id) {
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_HOST}/api/artworks/id/${id}`)
    .then((resp) => resp.data);

  return res;
}

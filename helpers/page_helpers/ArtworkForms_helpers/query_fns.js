import axios from "axios";

export async function updateArtworkAxios(data) {
  const response = await axios
    .put(`${process.env.NEXT_PUBLIC_HOST}/api/artworks`, data)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) {
        throw error.response;
      } else {
        throw error.toJSON();
      }
    });
  return response;
}

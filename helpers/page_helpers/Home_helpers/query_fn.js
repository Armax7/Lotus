import axios from "axios";

export async function getAllArtworksAxios() {
  const response = await axios
    .get(`${process.env.NEXT_PUBLIC_HOST}/api/artworks`)
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
export async function getArtworkByIdAxios(id) {
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_HOST}/api/artworks/id/${id}`)
    .then((resp) => resp.data)
    .catch((error) => {
      if (error.response) {
        throw error.response;
      } else {
        throw error.toJSON();
      }
    });

  return res;
}

export async function getUserDetailsAxios() {
  const userDetails = await axios
    .get(`${process.env.NEXT_PUBLIC_HOST}/api/user-details`)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) {
        throw error.response;
      } else {
        throw error.toJSON();
      }
    });

  return userDetails;
}

export async function postUserDetailsAxios(data) {
  const userDetails = await axios
    .post(`${process.env.NEXT_PUBLIC_HOST}/api/user-details`, data)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) {
        throw error.response;
      } else {
        throw error.toJSON();
      }
    });

  return userDetails;
}

export async function getSupportsAxios() {
  const supports = await axios
    .get(`${process.env.NEXT_PUBLIC_HOST}/api/supports`)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) {
        throw error.response;
      } else {
        throw error.toJSON();
      }
    });

  return supports;
}

export async function getTechniquesAxios() {
  const techniques = await axios
    .get(`${process.env.NEXT_PUBLIC_HOST}/api/techniques`)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) {
        throw error.response;
      } else {
        throw error.toJSON();
      }
    });

  return techniques;
}

export async function getCategoriesAxios() {
  const categories = await axios
    .get(`${process.env.NEXT_PUBLIC_HOST}/api/categories`)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) {
        throw error.response;
      } else {
        throw error.toJSON();
      }
    });

  return categories;
}

export async function getShowcaseByIdAxios(id) {
  const showcase = await axios
    .get(`${process.env.NEXT_PUBLIC_HOST}/api/art-showcase/id/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) {
        throw error.response;
      } else {
        throw error.toJSON();
      }
    });

  return showcase;
}

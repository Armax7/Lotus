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

export async function getAllArtworksByQueryAxios({
  techniques,
  categories,
  supports,
}) {
  let techniques_str = techniques ? techniques.toString() : null;
  if (Array.isArray(techniques)) {
    techniques_str = techniques.join("&technique_id=");
  }

  let categories_str = categories ? categories.toString() : null;
  if (Array.isArray(categories)) {
    categories_str = categories.join("&category_id=");
  }

  let supports_str = supports ? supports.toString() : null;
  if (Array.isArray(supports)) {
    supports_str = supports.join("&support_id=");
  }

  const filteredArtworks = await axios
    .get(
      `${process.env.NEXT_PUBLIC_HOST}/api/artworks/filter?technique_id=${techniques_str}&category_id=${categories_str}&support_id=${supports_str}`
    )
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) {
        throw error.response;
      } else {
        throw error.toJSON();
      }
    });

  return filteredArtworks;
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

export async function getArtworkByname(name) {
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_HOST}/api/artworks/name/${name}`)
    .then((resp) => resp.data)

    .catch((error) => {
      console.log(error.toJSON());
    });

  return res;
}

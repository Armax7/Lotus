import axios from "axios";

export async function getCheckoutSessionByIdAxios(session_id) {
  const data = await axios
    .get(`${process.env.NEXT_PUBLIC_HOST}/api/checkout/${session_id}`)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) {
        throw error.response;
      } else {
        throw error.toJSON();
      }
    });

  return data;
}

export async function getCheckoutSessionLineItemsAxios(session_id) {
  const lineItemsList = await axios
    .get(
      `${process.env.NEXT_PUBLIC_HOST}/api/checkout/${session_id}/line-items`
    )
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) {
        throw error.response;
      } else {
        throw error.toJSON();
      }
    });
  return lineItemsList;
}

export async function updateStockOnSuccessfulCheckoutAxios({
  artworkId,
  boughtQuantity,
}) {
  const prevStock = await axios
    .get(`${process.env.NEXT_PUBLIC_HOST}/api/artworks/id/${artworkId}`)
    .then((res) => res.data.at(0))
    .then((data) => data.stock);

  const newStock = Number(prevStock) - Number(boughtQuantity);

  if (newStock < 0)
    throw {
      statusCode: 402,
      type: "Request Failed",
      message: "Stock conflict: stock might not longer be available",
    };

  const response = await axios
    .put(`${process.env.NEXT_PUBLIC_HOST}/api/artworks`, {
      id: artworkId,
      stock: newStock,
    })
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

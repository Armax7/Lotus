import * as Controllers from "./order-details_controllers";

export async function handleGet(req, res) {
    const userId = req.query.user_id
    try {
      const response = await Controllers.getOrders(userId);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
}


export async function handlePost(req, res) {
  const body = req.body;
  try {
    const response = await Controllers.postOrder(body);
    return res.status(200).json("Detalle de orden guardado");
  } catch (error) {
    return res.status(error.status || 500).json(error);
  }
}



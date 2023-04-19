import * as Controllers from "./favorite_controllers";

export async function handleGet(req, res) {
  const userId = req.query.user_id
  try {
   
    const response = await Controllers.getFavoriteById(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
  export async function handlePut(req, res) {
    const newItem = req.body.items
    const userId = req.body.user_id
    try {
      const response = await Controllers.updateFavoriteItems(userId, newItem);
      return res.status(200).send("Favorito Actualizado exitosamente")
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

import * as Controllers from "./categories_controllers";

export async function handleGetAll(req, res) {
  try {
    const categories = await Controllers.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

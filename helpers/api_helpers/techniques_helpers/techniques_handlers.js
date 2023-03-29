import * as Controllers from "./techniques_controllers";

export async function handleGetAll(req, res) {
  try {
    const response = await Controllers.getAllTechniques();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

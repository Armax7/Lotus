import * as Controllers from "./supports_controllers";

export async function handleGet(req, res) {
  try {
    const response = await Controllers.getAllSupports();
    res.status(response.status).json(response.data);
  } catch (response) {
    res.status(response.status).json({ error: response.error.message });
  }
}

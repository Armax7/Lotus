import * as Controllers from "./artworks_controllers";

export async function handleGet(req, res) {
  try {
    const artworks = await Controllers.getAllArtworks();
    return res.status(200).json(artworks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handleGetById(req, res) {
  try {
    let { id } = req.query;
    const artWork = await Controllers.getArtworksById(id);
    return res.status(200).json(artWork);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

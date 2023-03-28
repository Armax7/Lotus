import * as Controllers from "./artworks_controllers";

export async function handleGet(req, res) {
  try {
    const artworks = await Controllers.getAllArtworks();
    return res.status(200).json(artworks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

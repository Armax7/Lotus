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

export async function handlerByName(req, res) {
  try {
    const { name } = req.query;
    const artworksName = await Controllers.getArtworksName(name);
    res.status(200).json(artworksName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function handleGetByFilter(req, res) {
  let body = req.query;
  try {
    const artworks = await Controllers.getArtworksFilteredByQuery(body);
    return res.status(200).json(artworks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

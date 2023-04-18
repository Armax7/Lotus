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
    res.status(200).send(artworksName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function handleGetByFilter(req, res) {
  let query = req.query;
  try {
    const artworks = await Controllers.getArtworksFilteredByQuery(query);
    return res.status(200).json(artworks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handleGetStripeProductById(req, res) {
  let { id: artworkId } = req.query;
  try {
    const artwork = await Controllers.getArtworkStripeProductById(artworkId);
    return res.status(200).json(artwork);
  } catch (error) {
    return res.status(error.status || error.statusCode || 500).json(error);
  }
}

export async function handlePost(req, res) {
  const body = req.body;
  try {
    const response = await Controllers.postArtwork(body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(error.status || 500).json(error);
  }
}

export async function handlePut(req, res) {
  const body = req.body;
  try {
    const response = await Controllers.updateArtwork(body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(error.status || 500).json(error);
  }
}

export async function handleDelete(req, res) {
  const body = req.body;
  try {
    const response = await Controllers.deleteArtwork(body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(error.status || 500).json(error);
  }
}

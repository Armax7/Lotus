import * as Controllers from "./reviews_controllers";

export async function handleGet(req, res) {
  const artworkId = req.query.artwork_id
  try {
    const reviews = await Controllers.getAllReviewsByArtworkId(artworkId);
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handleGetAllReviewsUser(req, res) {
  const userId = req.query.user_id
  try {
    const reviews = await Controllers.getAllReviewsByUserId(userId);
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handlePostReview(req, res) {
  const review = req.body;
  try {
    const response = await Controllers.postReview(review);
    return res.status(200).json("Calificacion posteada correctamente");
  } catch (error) {
    return res.status(error.status || 500).json(error);
  }
}


export async function handlePut(req, res) {
  const reviewUpdate = req.body;
  const reviewId = req.query.review_id
  try {
    const response = await Controllers.updateReview(reviewId, reviewUpdate);
    return res.status(200).json("Su calificacion a sido modificada");
  } catch (error) {
    return res.status(error.status || 500).json(error);
  }
}

export async function handleDelete(req, res) {
  const reviewId = req.query.review_id
  
  try {
    const response = await Controllers.deleteReview(reviewId);
    return res.status(200).json("Calificacion eliminada correctamente");
  } catch (error) {
    return res.status(error.status || 500).json(error);
  }
}

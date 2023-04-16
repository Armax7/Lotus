import { supabase } from "../../../lib/supabaseClient";



export async function getAllReviews() {
  let { data: allReviews, error } = await supabase
    .from("reviews")
    .select("*")


  if (error) throw error;
  return allReviews;
}

export async function getAllReviewsByArtworkId(artworkId) {
  let { data: reviews, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("artwork_id", artworkId);

  if (error) throw error;
  return reviews;
}

export async function getAllReviewsByUserId(userId) {
  let { data: reviews, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return reviews;
}


export async function postReview(review) {

if(!review.user_id || !review.artwork_id || !review.rating || !review.comment){
  throw new Error("Faltan completar datos")
}
  const { data, error } = await supabase
    .from('reviews')
    .insert(review)

  if (error) {
    console.log('Error actualizando la review:', error.message);
    return error.message;
  }

  console.log('Review actualizada exitosamente:', data);
  return data;
}


export async function updateReview(reviewId, updatedReview) {
    const { data, error } = await supabase
      .from('reviews')
      .update(updatedReview)
      .match({ id: reviewId });
  
    if (error) {
      return error.message;
    }
  
    return data;
  }
  
  

  export async function deleteReview(reviewId) {
    const { data, error } = await supabase
      .from('reviews')
      .delete()
      .match({ id: reviewId });
  
    if (error) {
   
      return error.message;
    }
  
    console.log('Review eliminada exitosamente:', data);
    return data;
  }
  

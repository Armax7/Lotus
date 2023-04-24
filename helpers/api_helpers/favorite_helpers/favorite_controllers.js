import { supabase } from "../../../lib/supabaseClient";

export async function getFavoriteById(userId) {
  const { data: favorite, error } = await supabase
    .from("user_details")
    .select("favorite")
    .eq("id", userId);

  if (error) throw error;

  return favorite[0].favorite;
}

export async function updateFavoriteItems(userId,newFavorite) {
  // Actualizar el registro con el nuevo valor de "cart"
  const { data: response, error } = await supabase
    .from("user_details")
    .update({ favorite: newFavorite })
    .eq("id", userId);

  if (error) {
    throw error;
  }

  return response;
}

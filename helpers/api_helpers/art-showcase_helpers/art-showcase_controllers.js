import { supabase } from "../../../lib/supabaseClient";


export async function getAllImages(id) {
  const { data: images, error } = await supabase
  .from("art_showcase")
  .select("*")
  .eq("artwork_id", id)

  if (error) throw error;

  return images;
}


export async function postImage(data) {
  const { data: response, error } = await supabase
  .from("art_showcase")
  .insert([data])

  if (error) throw error;

  return response;
}


export async function deleteImage(idImage) {
  const { data: response, error } = await supabase
  .from("art_showcase")
  .delete()
  .eq("id", idImage)

  if (error) throw error;

  return response;
}
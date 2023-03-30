import { supabase } from "../../../lib/supabaseClient";

export async function getAllArtworks() {
  const { data: artworks, error } = await supabase.from("artworks").select();

  if (error) throw error;

  return artworks;
}

export async function getArtworksById(id) {
  let { data: artworks, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("id", id);

  if (error) throw error;
  return artworks;
}

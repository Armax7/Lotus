import { supabase } from "../../../lib/supabaseClient";

export async function getAllArtworks() {
  const { data: artworks, error } = await supabase.from("artworks").select();

  if (error) throw error;

  return artworks;
}

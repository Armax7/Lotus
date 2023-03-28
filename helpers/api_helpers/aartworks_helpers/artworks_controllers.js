import { supabase } from "../../../lib/supabaseClient";

export async function getAllArtworks() {
  try {
    let { data: artworks, error } = await supabase.from("artworks").select("*");

    if (error) throw error

    return artworks;
  } catch (error) {
    throw error;
  }
}

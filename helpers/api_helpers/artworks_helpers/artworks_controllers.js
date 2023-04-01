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

export async function getArtworksName(name) {
  let { data: artworks, error } = await supabase
    .from("artworks")
    .select("*")
    .ilike("name", `%${name}%`);

  if (error) throw error;
  return artworks;
}

export async function getArtworksFilteredByQuery({
  name = null,
  technique_id = null,
  category_id = null,
  support_id = null,
}) {
  let query = supabase.from("artworks").select();

  if (!!name) {
    query = query.ilike("name", `%${name}%`);
  }
  if (!!technique_id) {
    query = query.eq("technique_id", technique_id);
  }
  if (!!category_id) {
    query = query.eq("category_id", category_id);
  }
  if (!!support_id) {
    query = query.eq("support_id", support_id);
  }

  const { data: artworks, error } = await query;

  if (error) throw error;
  return artworks;
}

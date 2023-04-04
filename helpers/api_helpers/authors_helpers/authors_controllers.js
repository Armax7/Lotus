import { supabase } from "../../../lib/supabaseClient";


export async function getAllAuthors() {
  const { data: authors, error } = await supabase
  .from("authors")
  .select("*");

  if (error) throw error;

  return authors;
}

export async function getAuthorsById(id) {
  const { data: images, error } = await supabase
  .from("authors")
  .select("*")
  .eq("id", id)

  if (error) throw error;

  return images;
}


export async function postAuthor(data) {
  const { data: response, error } = await supabase
  .from("authors")
  .insert([data])

  if (error) throw error;

  return response;
}


export async function deleteAuthor(id) {
  const { data: response, error } = await supabase
  .from("authors")
  .delete()
  .eq("id", id)

  if (error) throw error;

  return response;
}
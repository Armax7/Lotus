import { supabase } from "../../../lib/supabaseClient";

export async function getAllCategories() {
  const { data: categories, error } = await supabase.from("categories").select();

  if (error) throw error;

  return categories;
}

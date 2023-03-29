import { supabase } from "../../../lib/supabaseClient";

export async function getAllTechniques() {
  let { data: techniques, error } = await supabase
    .from("techniques")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;

  return techniques;
}

import { supabase } from "../../../lib/supabaseClient";

export async function getAllSupports() {
  const response = await supabase.from("supports").select();

  if (response.error) throw response.toJSON();

  return response;
}

import { supabase } from "../../../lib/supabaseClient";

export async function getAllUsersDetails() {
  const response = await supabase.from("user_details").select();

  if (response.error) throw response;

  return response;
}

export async function postUserDetails({
  id,
  name = null,
  image = null,
  address = null,
  is_banned = false,
}) {
  const response = await supabase
    .from("user_details")
    .insert([{ id, name, image, address, is_banned }]);

  if (response.error) throw response;

  return response;
}

export async function updateUserDetails({
  id,
  name,
  image,
  address,
  is_banned,
}) {
  const response = await supabase
    .from("user_details")
    .update({ name, image, address, is_banned })
    .eq("id", id)
    .select();

  if (response.error) throw response;

  return response;
}

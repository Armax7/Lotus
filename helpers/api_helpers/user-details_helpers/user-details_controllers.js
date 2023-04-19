import { supabase } from "../../../lib/supabaseClient";

export async function getAllUsersDetails() {
  const response = await supabase.from("user_details").select();

  if (response.error) throw response;

  return response;
}

export async function getUserDetailById({ id: userId }) {
  const response = await supabase.from("user_details").select("id", userId);

  if (response.error) throw response;

  return response;
}

export async function postUserDetails({
  id,
  name,
  image,
  address,
  is_banned,
  cart,
  favorite,
}) {
  const response = await supabase
    .from("user_details")
    .insert([{ id, name, image, address, is_banned, cart, favorite }]);

  if (response.error) throw response;

  return response;
}

export async function updateUserDetails({
  id,
  name,
  image,
  address,
  is_banned,
  cart,
  favorite,
}) {
  const response = await supabase
    .from("user_details")
    .update({ name, image, address, is_banned, cart, favorite })
    .eq("id", id)
    .select();

  if (response.error) throw response;

  return response;
}

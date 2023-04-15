import { supabase } from "../../../lib/supabaseClient";

export async function getCartById(userId) {
  const { data: cart, error } = await supabase
    .from("user_details")
    .select("cart")
    .eq("id", userId);

  if (error) throw error;

  return cart[0].cart;
}

export async function updateCartItems(userId,newCart) {
  // Actualizar el registro con el nuevo valor de "cart"
  const { data: response, error } = await supabase
    .from("user_details")
    .update({ cart: newCart })
    .eq("id", userId);

  if (error) {
    throw error;
  }

  return response;
}

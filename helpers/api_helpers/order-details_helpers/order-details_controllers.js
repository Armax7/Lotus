import { supabase } from "../../../lib/supabaseClient";




export async function getOrders(userId) {
  let { data: orders, error } = await supabase
    .from("order_details")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return orders;
}


export async function postOrder(body) {

if(!body.user_id || !body.artworks_cart || !body.payment_status || !body.amount_total){
  throw new Error("Faltan completar datos")
}
  const { data, error } = await supabase
    .from('order_details')
    .insert(body)

  if (error) {
    
    return error.message;
  }

  
  return data;
}


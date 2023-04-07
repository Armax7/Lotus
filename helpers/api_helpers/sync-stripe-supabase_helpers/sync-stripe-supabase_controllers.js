import { supabase } from "../../../lib/supabaseClient";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function updateAllSbPriceIdFromStripe() {
  const response = {
    supabase: {},
    stripe: {},
    error: null,
  };

  response.supabase = await supabase.from("artworks").select();

  if (response.supabase.error) {
    response.error = {
      status: response.supabase.status,
      statusText: response.supabase.statusText,
      message: response.supabase.error.message,
    };
    throw response;
  } else {
    try {
      const productsPromise = response.supabase.data.map((elem) => {
        return stripe.products.retrieve(elem.id);
      });
      const products = await Promise.all(productsPromise);
      response.stripe = { products };
      const dbUpdatesPromise = products.map((product) => {
        return supabase
          .from("artworks")
          .update({ stripe_price_id: product.default_price })
          .eq("id", product.id);
      });
      const updateResponse = await Promise.all(dbUpdatesPromise);
      response.message = "Updated";
      return response;
    } catch (error) {
      response.error = {
        status: error.statusCode || error.status || 500,
        statusText: error.type,
        message: error.message,
        param: error.param,
      };
      throw response;
    }
  }
}

export async function updateArtworksSbToStripe() {
  const response = {
    supabase: {},
    stripe: {},
    error: null,
  };

  response.supabase = await supabase.from("artworks").select();

  if (response.supabase.error) {
    response.error = {
      status: response.supabase.status,
      statusText: response.supabase.statusText,
      message: response.supabase.error.message,
    };
    throw response;
  } else {
    try {
      const updatePromises = response.supabase.data.map((elem) => {
        return stripe.products.update(elem.id, {
          unit_label: elem.stock,
        });
      });
      const products = await Promise.allSettled(updatePromises).then(
        (results) =>
          results.map((result) => {
            if (result.status === "fulfilled") {
              return result.value;
            }
          })
      );
      response.stripe = { products };
      return {
        status: 200,
        message: "Stripe updated with SupabaseData",
        product_list: products,
      };
    } catch (error) {
      response.error = {
        status: error.statusCode || error.status || 500,
        statusText: error.type,
        message: error.message,
        param: error.param,
      };
      throw response;
    }
  }
}

import { supabase } from "../../../lib/supabaseClient";
import { v4 as uuidV4 } from "uuid";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function getAllArtworks() {
  const { data: artworks, error } = await supabase
    .from("artworks")
    .select()
    .order("created_at", { ascending: false });

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
    query = Array.isArray(technique_id)
      ? query.in("technique_id", technique_id)
      : query.eq("technique_id", technique_id);
  }
  if (!!category_id) {
    query = Array.isArray(category_id)
      ? query.in("category_id", category_id)
      : query.eq("category_id", category_id);
  }
  if (!!support_id) {
    query = Array.isArray(support_id)
      ? query.in("support_id", support_id)
      : query.eq("support_id", support_id);
  }

  const { data: artworks, error } = await query.order("created_at", {
    ascending: false,
  });

  if (error) throw error;
  return artworks;
}

export async function getArtworkStripeProductById(artworkId) {
  const product = await stripe.products.retrieve(artworkId);
  return product;
}

export async function postArtwork({
  name,
  description,
  image,
  size,
  price,
  available = true,
  stock = 1,
  technique_id,
  category_id,
  support_id,
  author_id,
}) {
  const id = uuidV4();
  const response = { supabase: {}, stripe: {}, error: null };

  if (!image || !price) {
    response.error = {
      status: 400,
      type: "RequestError",
      message: `Mising parameter: ${!image ? "image" : "price"}`,
    };
    throw response.error;
  }

  try {
    const stripeResponse = await stripe.products.create({
      id,
      name,
      ...(description && { description: description }),
      images: [image],
      default_price_data: {
        currency: "usd",
        unit_amount: price * 100,
      },
      active: available && stock > 0,
      unit_label: stock,
    });

    const supaResponse = await supabase.from("artworks").insert([
      {
        id,
        name,
        description,
        image,
        size,
        price,
        available,
        stock,
        technique_id,
        category_id,
        support_id,
        author_id,
        stripe_price_id: stripeResponse.default_price,
      },
    ]);

    if (supaResponse.error)
      throw {
        status: supaResponse.status,
        type: supaResponse.statusText,
        message: supaResponse.error.message,
      };

    response.stripe = stripeResponse;
    response.supabase = supaResponse;

    return response;
  } catch (error) {
    response.error = {
      status: error.status || error.statusCode || error.code || 500,
      type: error.type,
      message: error.message || "Unhandled error",
      ...(error.param && { param: error.param }),
    };
    throw response.error;
  }
}

export async function updateArtwork({
  id: artworkId,
  name,
  description,
  image,
  size,
  price,
  available,
  stock,
  technique_id,
  category_id,
  support_id,
  author_id,
}) {
  const response = { supa: {}, stripe: {}, error: null };
  try {
    const priceId = await supabase
      .from("artworks")
      .select("stripe_price_id")
      .eq("id", artworkId)
      .then((res) => {
        return res.data.at(0).stripe_price_id;
      });

    if (priceId.error) {
      response.error = {
        status: priceId.status,
        type: priceId.statusText,
        message: priceId.error.message,
      };
      throw response.error;
    }

    const stripePriceResponse = price
      ? await stripe.prices
          .create({
            unit_amount: price * 100,
            currency: "usd",
            product: artworkId,
          })
          .then((res) => res.id)
      : priceId;

    const stripeProductResponse = await stripe.products.update(artworkId, {
      ...(name && { name: name }),
      ...(description && { description: description }),
      ...(image && { images: [image] }),
      ...(price && { default_price: stripePriceResponse }),
      ...(typeof available === "boolean"
        ? { active: stock && stock <= 0 ? false : available }
        : null),
      ...(stock && { unit_label: stock }),
    });

    response.stripe = {
      product: stripeProductResponse,
      price: price,
      price_id: stripePriceResponse,
    };

    const supaResponse = await supabase
      .from("artworks")
      .update({
        name,
        description,
        image,
        size,
        price,
        available,
        stock,
        technique_id,
        category_id,
        support_id,
        author_id,
      })
      .eq("id", artworkId);

    if (supaResponse.error) {
      response.error = {
        status: supaResponse.status,
        type: supaResponse.statusText,
        message: supaResponse.error.message,
      };
      throw response.error;
    }

    response.supa = supaResponse;

    return response;
  } catch (error) {
    response.error = {
      status: error.status || error.statusCode || error.code || 500,
      type: error.type,
      message: error.message || "Unhandled error",
      ...(error.param && { param: error.param }),
    };
    throw response.error;
  }
}

export async function deleteArtwork({ id: artworkId }) {
  const response = { supa: {}, stripe: {}, error: null };

  try {
    const supaResponse = await supabase
      .from("artworks")
      .delete()
      .eq("id", artworkId);

    if (supaResponse.error) {
      response.error = {
        status: supaResponse.status,
        type: supaResponse.statusText,
        message: supaResponse.error.message,
      };
      throw response.error;
    }

    const stripeResponse = await stripe.products.update(artworkId, {
      active: false,
    });

    response.supa = supaResponse;
    response.stripe = stripeResponse;

    return response;
  } catch (error) {
    response.error = {
      status: error.status || error.statusCode || error.code || 500,
      type: error.type,
      message: error.message || "Unhandled error",
      ...(error.param && { param: error.param }),
    };
    throw response.error;
  }
}

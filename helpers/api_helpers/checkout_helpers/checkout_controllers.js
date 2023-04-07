const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession(checkoutItems) {
  if (!Array.isArray(checkoutItems))
    throw new TypeError("checkoutItems should be an array");

  const session = await stripe.checkout.sessions.create({
    line_items: [...checkoutItems],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_HOST}/purchase?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_HOST}/purchase?success=true`,
  });
  return session;
}

export async function retrieveCheckoutSessionById(id) {
  if (!id.startsWith("cs_")) throw Error("Incorrect CheckoutSession ID.");

  const checkout_session = await stripe.checkout.sessions.retrieve(id);

  return checkout_session;
}

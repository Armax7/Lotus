const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function retrieveWebhookEvent(rawBody, signature) {
  let event = stripe.webhooks.constructEvent(
    rawBody.toString(),
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
  return event;
}

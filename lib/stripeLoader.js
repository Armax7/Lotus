import { loadStripe } from "@stripe/stripe-js";

let stripePromisePk = null;
function getStripePk() {
  if (!stripePromisePk) {
    stripePromisePk = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
  }
  return stripePromisePk;
}

let stripePromiseSk = null;
function getStripeSk() {
  if (!stripePromiseSk) {
    stripePromiseSk = loadStripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripePromiseSk;
}

export const stripePk = await getStripePk();

export const stripeSk = await getStripeSk();

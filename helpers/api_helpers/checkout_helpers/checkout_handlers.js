import * as Controllers from "./checkout_controllers";

export async function handlePostCheckoutSession(req, res) {
  const checkoutItems = req?.body?.items ?? [];
  try {
    const session = await Controllers.createCheckoutSession(checkoutItems);
    return res.status(200).json(session);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}

export async function handleGetCheckoutSessionById(req, res) {
  const { id: session_id } = req.query;

  try {
    const checkout_session = await Controllers.retrieveCheckoutSessionById(
      session_id
    );
    res.status(200).json(checkout_session);
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}
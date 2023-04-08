import * as Controllers from "./webhook_controllers";
import { buffer } from "micro";

export async function handlePostCheckoutWebhook(req, res) {
  let event;
  try {
    const rawBody = await buffer(req);
    const signature = req.headers["stripe-signature"];
    event = await Controllers.retrieveWebhookEvent(rawBody, signature);
  } catch (error) {
    return res.status(400).json({ error: `Webhook error: ${error.message}` });
  }

  console.log("Webhook even success: ", event.id);

  if (event.type === "checkout.session.completed") {
    console.log("💸 Payment received");
    /* AQUI VA LA LOGICA PARA ENVIAR CORREO
     * Aquí se confirma el checkout por lo que el código
     * para enviar un correo de confirmación de compra
     * puede ir aquí
     * Aprovecha el bug 😉
     */
  } else if (event.type === "checkout.session.async_payment_failed") {
    console.log("❌ Payment failed");
    /* AQUI VA LA LOGICA PARA ENVIAR CORREO
     * Aquí se confirma si el pago falló por lo que el código
     * para enviar un correo de confirmación de compra
     * puede ir aquí
     * Aprovecha el bug 😉
     */
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }
  res.send();
}

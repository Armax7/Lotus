import * as Handlers from "../../../helpers/api_helpers/checkout_helpers/checkout_handlers";
import * as Methods from "../../../helpers/api_helpers/methods";

export default async function handlerCheckout(req, res) {
  const method = req.method;

  switch (method) {
    case Methods.POST:
      await Handlers.handlePostCheckoutSession(req, res);
      break;
    default:
      res.setHeader("Allow", Methods.POST);
      return res.status(404).end("Method not allowed");
  }
}

import * as Handlers from "../../../../helpers/api_helpers/checkout_helpers/checkout_handlers";
import * as Methods from "../../../../helpers/api_helpers/methods";

export default async function handlerCheckout(req, res) {
  const method = req.method;

  switch (method) {
    case Methods.GET:
      await Handlers.handleGetCheckoutSessionById(req, res);
      break;
    default:
      return res.status(400).json({
        message: "400 Bad Request: invalid method",
      });
  }
}

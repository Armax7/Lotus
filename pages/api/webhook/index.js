import * as Handlers from "../../../helpers/api_helpers/webhook_helpers/webhook_handlers";
import * as Methods from "../../../helpers/api_helpers/methods";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handlerCheckout(req, res) {
  const method = req.method;

  switch (method) {
    case Methods.POST:
      await Handlers.handlePostCheckoutWebhook(req, res);
      break;
    default:
      res.setHeader("Allow", Methods.POST);
      return res.status(404).end("Method not allowed");
  }
}

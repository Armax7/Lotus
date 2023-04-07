import * as Handlers from "../../../helpers/api_helpers/checkout_helpers/checkout_handlers";

export default async function handlerCheckoutSessionId(req, res) {
  return await Handlers.handleGetCheckoutSessionById(req, res);
}

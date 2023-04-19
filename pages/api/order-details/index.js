import * as Handlers from "../../../helpers/api_helpers/order-details_helpers/order-details_handlers"
import * as Methods from "../../../helpers/api_helpers/methods";

export default async function handlerOrderDetails(req, res) {
  const method = req.method;

  switch (method) {
    case Methods.GET:
      return await Handlers.handleGet(req, res);
    case Methods.POST:
      return await Handlers.handlePost(req, res);

    default:
      return res.status(400).json({
        message: "400 Bad Request: invalid method",
      });
  }
}

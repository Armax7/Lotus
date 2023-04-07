import * as Handlers from "../../../helpers/api_helpers/sync-stripe-supabase_helpers/sync-stripe-supabase_handlers";
import * as Methods from "../../../helpers/api_helpers/methods";

export default async function handlerPriceIdToSbFromStripe(req, res) {
  const method = req.method;

  switch (method) {
    case Methods.PUT:
      return await Handlers.handleUpdateAllSpPriceIdsFromStripe(req, res);
    default:
      return res.status(400).json({
        message: "400 Bad Request: invalid method",
      });
  }
}
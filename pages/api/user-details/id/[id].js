import * as Handlers from "../../../../helpers/api_helpers/user-details_helpers/user-details_handlers";
import * as Methods from "../../../../helpers/api_helpers/methods";

export default async function handlerCategories(req, res) {
  const method = req.method;

  switch (method) {
    case Methods.GET:
      return await Handlers.handleGetById(req, res);
    default:
      return res.status(400).json({
        message: "400 Bad Request: invalid method",
      });
  }
}

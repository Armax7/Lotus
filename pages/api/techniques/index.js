import * as Handlers from "../../../helpers/api_helpers/techniques_helpers/techniques_handlers";
import * as Methods from "../../../helpers/api_helpers/methods";

export default async function handlerTechniques(req, res) {
  const method = req.method;

  switch (method) {
    case Methods.GET:
      return await Handlers.handleGetAll(req, res);
    case Methods.POST:
    case Methods.PUT:
    case Methods.DELETE:
    default:
      return res.status(400).json({
        message: "400 Bad Request: invalid method",
      });
  }
}

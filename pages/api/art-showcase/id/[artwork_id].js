import * as Handlers from "../../../../helpers/api_helpers/art-showcase_helpers/art-showcase_handlers";
import * as Methods from "../../../../helpers/api_helpers/methods";

export default async function handlerShowCase(req, res) {
  const method = req.method;

  switch (method) {
    case Methods.GET:
      return await Handlers.handleGetByArtworkId(req, res);
    default:
      return res.status(400).json({
        message: "400 Bad Request: invalid method",
      });
  }
}

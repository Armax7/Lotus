import * as Handlers from "../../../helpers/api_helpers/artworks_helpers/artworks_handlers";
import * as Methods from "../../../helpers/api_helpers/methods";

export default async function handlerArtworks(req, res) {
  const method = req.method;

  switch (method) {
    case Methods.GET:
      return await Handlers.handleGet(req, res);
    case Methods.POST:
      return await Handlers.handlePost(req, res);
    case Methods.PUT:
      return await Handlers.handlePut(req, res);
    case Methods.DELETE:
      return await Handlers.handleDelete(req, res);
    default:
      return res.status(400).json({
        message: "400 Bad Request: invalid method",
      });
  }
}

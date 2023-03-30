import * as Handlers from "../../../../helpers/api_helpers/artworks_helpers/artworks_handlers";
import * as Methods from "../../../../helpers/api_helpers/methods";

export default async function handlerArtworksById(req, res) {
  const method = req.method;

  switch (method) {
    case Methods.GET:
      console.log(req.query);
      return await Handlers.handleGetById(req, res);

    default:
      return res.status(400).json({
        message: "400 Bad Request: invalid method",
      });
  }
}

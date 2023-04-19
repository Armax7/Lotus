import * as Handlers from "../../../helpers/api_helpers/favorite_helpers/favorite_handlers.js";
import * as Methods from "../../../helpers/api_helpers/methods";

export default async function handlerFavorite(req, res) {
    const method = req.method;
  
    switch (method) {
      case Methods.GET:
        return await Handlers.handleGet(req, res);
      case Methods.PUT:
        return await Handlers.handlePut(req, res); 
      default:
        return res.status(400).json({
          message: "400 Bad Request: invalid method",
        });
    }
  }
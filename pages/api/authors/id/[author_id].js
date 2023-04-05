import * as Handlers from "../../../../helpers/api_helpers/authors_helpers/authors_handlers"
import * as Methods from "../../../../helpers/api_helpers/methods";

export default async function handlerAuthors(req, res) {
  const method = req.method;

  switch (method) {
    case Methods.GET:
      return await Handlers.handleGetByAuthorId(req, res);
    default:
      return res.status(400).json({
        message: "400 Bad Request: invalid method",
      });
  }
}

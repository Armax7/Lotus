import * as Handlers from "../../../helpers/api_helpers/nodemailer_helpers/nodemailer_handlers"
import * as Methods from "../../../helpers/api_helpers/methods";
 
export default async function mailHandler(req, res) {
    const method = req.method;
  
    switch (method) {
      case Methods.POST:
        return await Handlers.handleSendMail(req, res)
      default:
        return res.status(400).json({
          message: "400 Bad Request: invalid method",
        });
    }
  }
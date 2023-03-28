// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { json_mock } from "../../helpers/mocks/pages_mock/landing_mocks";

export default function handler(req, res) {
  res.status(200).json(json_mock);
}

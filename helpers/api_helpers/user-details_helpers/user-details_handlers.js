import * as Controllers from "./user-details_controllers";

export async function handleGet(req, res) {
  try {
    const response = await Controllers.getAllUsersDetails();
    return res.status(response.status).json(response.data);
  } catch (response) {
    return res.status(response.status).json({ error: response.error.message });
  }
}

export async function handleGetById(req, res) {
  const body = req.body;
  try {
    const response = await Controllers.getUserDetailById(body);
    return res.status(response.status).json(response.data);
  } catch (response) {
    return res.status(response.status).json({ error: response.error.message });
  }
}

export async function handlePost(req, res) {
  const body = req.body;
  try {
    const response = await Controllers.postUserDetails(body);
    return res.status(response.status).json(response.data);
  } catch (response) {
    return res.status(response.status).json({ error: response.error.message });
  }
}

export async function handlePut(req, res) {
  const body = req.body;
  try {
    const response = await Controllers.updateUserDetails(body);
    return res.status(response.status).json(response.data);
  } catch (response) {
    return res.status(response.status).json({ error: response.error.message });
  }
}

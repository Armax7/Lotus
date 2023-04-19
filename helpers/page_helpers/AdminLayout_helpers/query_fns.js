import axios from "axios";
import * as UserManagement from "../../supabase_helpers/user_management";

export async function getUserIdQuery() {
  try {
    const userId = await UserManagement.getUserId();
    return userId;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else {
      throw error.toJSON();
    }
  }
}

export async function getUserRole(userId) {
  const role = await axios
    .get(`${process.env.NEXT_PUBLIC_HOST}/api/user-details/id/${userId}`)
    .then((res) => res.data.at(0).role)
    .catch((error) => {
      throw error;
    });

  return role;
}

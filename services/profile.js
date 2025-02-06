import Axios from "axios";
import { domain } from "../global/domain";

export async function updateProfile(id, data) {
  try {
    const response = await Axios.patch(`${domain}/users/profile/${id}`, data);

    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

export async function updatePassword(data) {
  try {
    const response = await Axios.patch(`${domain}/users/password/update`, data);
    return console.log(response), response;
  } catch (error) {
    return console.log(error), { error, isError: true };
  }
}

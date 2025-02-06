import Axios from "axios";
import { domain } from "../global/domain";

export async function sendMessage(data) {
  try {
    const response = await Axios.post(`${domain}/contacts/create/`, data);
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

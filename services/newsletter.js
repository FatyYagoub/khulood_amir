import Axios from "axios";
import { domain } from "../global/domain";

export async function addToNewsletter(data) {
  console.log(data);
  try {
    const response = await Axios.post(`${domain}/newsletters/`, data);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return { error, isError: true };
  }
}

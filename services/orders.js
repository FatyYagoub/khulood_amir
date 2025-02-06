import Axios from "axios";
import { domain } from "../global/domain";

export async function createOrder(token, data) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Axios.post(
      `${domain}/orders/courses/create`,
      data,
      config
    );
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

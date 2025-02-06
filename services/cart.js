import Axios from "axios";
import { domain } from "../global/domain";

export async function addToCart(token, data) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Axios.post(
      `${domain}/cart/courses/add-to-cart`,
      data,
      config
    );
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

export async function deleteFromCart(token, data) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Axios.delete(
      `${domain}/cart/courses/remove-from-cart`,
      {
        data,
        ...config,
      }
    );
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

export async function clearCart(token) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Axios.delete(`${domain}/cart/courses/clear`, config);
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

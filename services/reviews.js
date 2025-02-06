import Axios from "axios";
import { domain } from "../global/domain";

export async function addReview(token, data) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Axios.post(`${domain}/reviews/create`, data, config);
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

export async function updateReview(token, id, data) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Axios.patch(
      `${domain}/reviews/actions/${id}/`,
      data,
      config
    );
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

export async function deleteReview(token, id) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Axios.delete(
      `${domain}/reviews/actions/${id}`,
      config
    );
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

export async function addReply(token, data) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Axios.post(
      `${domain}/reviews/replies/create`,
      data,
      config
    );
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

export async function updateReply(token, id, data) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Axios.patch(
      `${domain}/reviews/replies/actions/${id}/`,
      data,
      config
    );
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

export async function deleteReply(token, id) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Axios.delete(
      `${domain}/reviews/replies/actions/${id}`,
      config
    );
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

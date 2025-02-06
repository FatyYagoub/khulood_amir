import Axios from "axios";
import { domain } from "../global/domain";

export async function addComment(token, data) {
  console.log(token, data);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Axios.post(
      `${domain}/comments/blog/create`,
      data,
      config
    );
    return console.log(response), response;
  } catch (error) {
    return console.log(error), { error, isError: true };
  }
}

export async function updateComment(token, id, data) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Axios.patch(
      `${domain}/comments/blog/actions/${id}/`,
      data,
      config
    );
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

export async function deleteComment(token, id) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Axios.delete(
      `${domain}/comments/blog/actions/${id}`,
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
      `${domain}/comments/replies/create`,
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
      `${domain}/comments/replies/actions/${id}`,
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
      `${domain}/comments/replies/actions/${id}`,
      config
    );
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

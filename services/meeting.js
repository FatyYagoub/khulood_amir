import Axios from "axios";
import { domain } from "../global/domain";

export async function addComment(token, data) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Axios.post(
      `${domain}/reviews/interview/create`,
      data,
      config
    );
    return response;
  } catch (error) {
    return { error, isError: true };
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
      `${domain}/reviews/interview/actions/${id}/`,
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
      `${domain}/reviews/interview/actions/${id}`,
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
      `${domain}/reviews/interview/replies/create`,
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
      `${domain}/reviews/interview/replies/actions/${id}`,
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
      `${domain}/reviews/interview/replies/actions/${id}`,
      config
    );
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

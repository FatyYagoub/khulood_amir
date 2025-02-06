import Axios from "axios";
import { domain } from "../global/domain";

export async function enroll(token, data) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Axios.post(
      `${domain}/enrollments/create`,
      data,
      config
    );
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

export async function packEnroll(token, data) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Axios.post(
      `${domain}/enrollments/create/multiple`,
      data,
      config
    );
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

export async function completeLecture(token, data) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Axios.post(
      `${domain}/enrollments/progress/save`,
      data,
      config
    );
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

import Axios from "axios";

export async function bookSession(token, data, locale) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Axios.post(
      `https://khuloodamir.smartiniaclient.com/coaching/sessions/join?lang=${locale}`,
      data,
      config
    );
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

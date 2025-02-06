import Axios from "axios";
import { domain } from "../global/domain";

export async function bookConsultation(token, data) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await Axios.post(
      `${domain}/coaching/consultations/reservations/book`,
      data,
      config
    );
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

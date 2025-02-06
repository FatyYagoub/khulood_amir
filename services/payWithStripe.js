import Axios from "axios";
import { domain } from "../global/domain";

export async function pay(data) {
  try {
    const response = await Axios.post(
      `${domain}/payments/checkout/courses/create`,
      data
    );
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

export async function paySession(data) {
  try {
    const response = await Axios.post(
      `${domain}/payments/checkout/coaching/sessions/create`,
      data
    );
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

export async function payConsultation(data) {
  try {
    const response = await Axios.post(
      `${domain}/payments/checkout/coaching/consultations/create`,
      data
    );
    return response;
  } catch (error) {
    return { error, isError: true };
  }
}

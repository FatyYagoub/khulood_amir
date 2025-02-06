import axios from "axios";
import { domain } from "../global/domain";

export async function sendEmailUserActivation(email, locale) {
  try {
    const response = await axios.post(
      `${domain}/users/resend-email?lang=${locale}`,
      {
        email,
      }
    );
    return response;
  } catch (error) {
    return { error };
  }
}

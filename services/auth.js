import Axios from "axios";
import { domain } from "../global/domain";

export async function login(data) {
  try {
    const response = await Axios.post(`${domain}/users/token`, data);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function loginWithGoogle(data) {
  try {
    const response = await Axios.post(`${domain}/users/social-auth`, data);
    return response;
  } catch (error) {
    return error;
  }
}

export async function signup(data, locale) {
  try {
    const response = await Axios.post(
      `${domain}/users/register?lang=${locale}`,
      {
        ...data,
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
}
export async function forgotPassword(data, locale) {
  try {
    const response = await Axios.post(`${domain}/users/forget-password`, {
      ...data,
      lang: locale,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function resetPasswordToken(data, token) {
  try {
    const response = await Axios.post(
      `${domain}/users/reset-password/${token}`,
      data
    );

    return response;
  } catch (error) {
    return error.response;
  }
}

export function storeTheUser(data, token, refresh) {
  localStorage.setItem("user", JSON.stringify(data));
  localStorage.setItem("token", token);
  localStorage.setItem("refresh", refresh);
}
export function storeTheToken(token, refresh) {
  localStorage.setItem("token", token);
  localStorage.setItem("refresh", refresh);
}

export function getTheUserFromStorage() {
  if (typeof window !== "undefined")
    return JSON.parse(localStorage.getItem("user"));
}

export function getTheTokenFromStorage() {
  if (typeof window !== "undefined") return localStorage.getItem("token");
}

export function getTheRefresh() {
  if (typeof window !== "undefined") return localStorage.getItem("refresh");
}

export async function getAccessWithRefresh(data) {
  try {
    const response = await Axios.post(`${domain}/users/token/refresh`, data);
    return response;
  } catch (error) {
    return error.response;
  }
}

export function deleteTheUserAndTokenFromStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
}

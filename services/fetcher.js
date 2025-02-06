import axios from "axios";

export const fetcher = (url) => axios.get(url).then((res) => res.data);
export const fetcherAuth = (url, token) =>
  token
    ? axios
        .get(url, { headers: { Authorization: "Bearer " + token } })
        .then((res) => res.data)
    : null;

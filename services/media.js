import Axios from "axios";
import { domain } from "../global/domain";
// backblaze
export async function upload(file, progressFn) {
  // b2_authorize_account
  let {
    data: { authorizationToken, downloadUrl, apiUrl },
  } = await b2_authorize_account();

  // b2_get_upload_url
  let res2 = await b2_get_upload_url(authorizationToken, apiUrl);

  const { authorizationToken: upload_authorization_token, uploadUrl } =
    res2.data;

  console.log("💡", res2);

  // b2_upload_file
  let random = Math.floor(Math.random() * 9000000000) + 1000000000;

  let res3 = await b2_upload_file(
    uploadUrl,
    upload_authorization_token,
    `${random}-${file.name.replaceAll(" ", "_")}`,
    file.type,
    file,
    progressFn
  );

  console.log("🚨", res3);

  return `${downloadUrl}/file/coach-ragda/${random}-${file.name.replaceAll(
    " ",
    "_"
  )}`;
}

export async function b2_authorize_account() {
  try {
    const response = await Axios.get(
      `${domain}/file-manager/upload/b2_authorize_account`
    );
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function b2_get_upload_url(authorizationToken, apiUrl) {
  try {
    const response = await Axios.post(
      `${domain}/file-manager/upload/b2_get_upload_url`,
      { account_authorization_token: authorizationToken, api_url: apiUrl }
    );
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function b2_upload_file(
  upload_url,
  upload_authorization_token,
  file_name,
  file_type,
  file,
  progressFn
) {
  try {
    const config = {
      headers: {
        Authorization: upload_authorization_token,
        "X-Bz-File-Name": file_name,
        "Content-Type": file_type,
        "X-Bz-Content-Sha1": "do_not_verify",
      },
      onUploadProgress: progressFn,
    };

    const response = await Axios.post(upload_url, file, config);

    return response;
  } catch (error) {
    return error.response;
  }
}

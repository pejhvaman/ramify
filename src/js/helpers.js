import { API_TIMEOUT_SECS } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async function (url) {
  try {
    // const res = await fetch(url);
    const res = await Promise.race([fetch(url), timeout(API_TIMEOUT_SECS)]);
    if (!res.json) throw new Error(`${res.message} (${res.status})`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

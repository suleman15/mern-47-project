import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8800",
  // timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosRequest = async (url, token, data, method) => {
  try {
    const request = await axiosInstance(url, {
      method: method || "GET",
      data: data,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return request.data;
  } catch (error) {
    let err = error.response.data;
    return { status: err.status, message: err.message };
  }
};

export const fetchUser = async (token, id) => {
  try {
    let url = !id ? `user/get-user` : `user/get-user/${id}`;
    let userData = apiRequest({
      url,
      token: token,
      method: "POST",
    });
  } catch (error) {
    console.log(error);
  }
};

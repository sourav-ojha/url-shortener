import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const loginUser = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: `${API_URL}/login`,
      data,
    });
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const register = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: `${API_URL}/register`,
      data,
    });
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

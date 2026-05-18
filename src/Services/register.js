import axios from "axios";

export async function SendRegister(data) {
  try {
    const res = await axios.post(
      "https://route-posts.routemisr.com/users/signup",
      data,
      {
        headers: {
          "content-type": "application/json",
        },
      },
    );
    return res.data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Network error",
    };
  }
}
export async function SendLogin(data) {
  try {
    const res = await axios.post(
      "https://route-posts.routemisr.com/users/signin",
      data,
      {
        headers: {
          "content-type": "application/json",
        },
      },
    );
    return res.data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Network error",
    };
  }
}
export async function ChangePassword(data) {
  try {
    const res = await axios.patch(
      "https://route-posts.routemisr.com/users/change-password",
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return res.data
  } catch (err) {
    return err.response?.data;
  }
}

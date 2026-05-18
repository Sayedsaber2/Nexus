import axios from "axios";

// FollowService.js
export async function getFollowSuggestions() {
  try {
    const { data } = await axios.get(
      "https://route-posts.routemisr.com/users/suggestions?limit=10",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function followUser(userId) {
  try {
    const { data } = await axios.put(
      `https://route-posts.routemisr.com/users/${userId}/follow`,
      {}, // ✅ body فاضي
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}
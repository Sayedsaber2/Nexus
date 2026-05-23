import axios from "axios";

export async function LikeUnlikePost(postId) {
  try {
    const { data } = await axios.put(
      `https://route-posts.routemisr.com/posts/${postId}/like`,
      {}, // body فاضي
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

export async function BookmarkUnbookmarkPost(postId) {
  try {
    const { data } = await axios.put(
      `https://route-posts.routemisr.com/posts/${postId}/bookmark`,
      {}, // body فاضي
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

export async function SharePost(postId, body) {
  try {
    const { data } = await axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/share`,
      { body },
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

export async function LikeUnlikeComment(postId, commentId) {
  try {
    const { data } = await axios.put(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return data;
  } catch (err) {
    return err.response?.data;
  }
}
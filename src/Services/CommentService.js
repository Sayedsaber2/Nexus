import axios from "axios";

export async function getPostComments(postId) {

  try {
    const {data} = await axios.get(`https://route-posts.routemisr.com/posts/${postId}/comments?page=1&limit=10`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

    });
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
export async function CreateComment(postId, content) {
  try {
    const { data } = await axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      {
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function DeleteComment(postId, commentId) {
  try {
    const { data } = await axios.delete(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
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

export async function UpdateComment(postId, commentId, content) {
  try {
    const formData = new FormData();
    formData.append("content", content);

    const { data } = await axios.put(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
      formData,
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

export async function getCommentReplies(postId, commentId ) {
  try {
    const { data } = await axios.get(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/replies?page=1&limit=10`,
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

export async function CreateReply(postId, commentId, content) {
  try {
    const { data } = await axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/replies`,
      { content },
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
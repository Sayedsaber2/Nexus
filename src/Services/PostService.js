import axios from "axios";

export async function getPosts() {
  try {
    const {data} = await axios.get("https://route-posts.routemisr.com/posts", {
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
export async function getLikesPosts(PostId) {
  try {
    const {data} = await axios.get(
      `https://route-posts.routemisr.com/posts/${PostId}/likes?page=1&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
export async function getSinglePost(PostId) {
  try {
    const {data} = await axios.get(
      `https://route-posts.routemisr.com/posts/${PostId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
export async function CreatePostApi(formdata) {
  try {
    const {data} = await axios.post(
      `https://route-posts.routemisr.com/posts`,
      formdata,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getMyProfile() {
  try {
    const {data} = await axios.get(
      "https://route-posts.routemisr.com/users/profile-data",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getUserPosts(userId) {
  const { data } = await axios.get(
    `https://route-posts.routemisr.com/users/${userId}/posts`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return data;
}
export async function UploadProfilePhoto(formdata) {
  try {
    const { data } = await axios.put(
      "https://route-posts.routemisr.com/users/upload-photo",
      formdata,
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
export async function getHomeFeed() {
  try {
    const {data} = await axios.get(
      "https://route-posts.routemisr.com/posts/feed?only=following&limit=10",
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

export async function DeletePost(postId) {
  try {
    const { data } = await axios.delete(
      `https://route-posts.routemisr.com/posts/${postId}`,
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

export async function UpdatePost(postId, formData) {
  try {
    const { data } = await axios.put(
      `https://route-posts.routemisr.com/posts/${postId}`,
      formData, // ✅ مباشرة
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
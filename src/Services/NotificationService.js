import axios from "axios";

const headers = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export async function getNotifications() {
  try {
    const { data } = await axios.get(
      "https://route-posts.routemisr.com/notifications?unread=false&page=1&limit=10 ",
      { headers: headers() }
    );
    return data;
  } catch (err) {
    return err.response?.data;
  }
}

export async function getUnreadCount() {
  try {
    const { data } = await axios.get(
      "https://route-posts.routemisr.com/notifications/unread-count",
      { headers: headers() }
    );
      console.log("unread:", data); 
    return data;
  } catch (err) {
    return err.response?.data;
  }
}

export async function markAsRead(notificationId) {
  try {
    const { data } = await axios.patch(
      `https://route-posts.routemisr.com/notifications/${notificationId}/read`,
      {},
      { headers: headers() }
    );
    return data;
  } catch (err) {
    return err.response?.data;
  }
}

export async function markAllAsRead() {
  try {
    const { data } = await axios.patch(
      "https://route-posts.routemisr.com/notifications/read-all",
      {},
      { headers: headers() }
    );
    return data;
  } catch (err) {
    return err.response?.data;
  }
}
import {useContext, useEffect, useState} from "react";

import {
  Bell,
  Heart,
  MessageCircle,
  Repeat2,
  UserPlus,
  Loader2,
} from "lucide-react";
import {useNavigate} from "react-router-dom";
import LoadingScrean from "@/Components/LoadingScrean";
import {
  getNotifications,
  markAllAsRead,
  markAsRead,
} from "@/Services/NotificationService";
import {AuthConText} from "@/Context/AuthConText";
const NOTIF_CONFIG = {
  like_post: {text: "liked your post"},
  comment_post: {text: "commented on your post"},
  share_post: {text: "shared your post"},
  follow: {text: "started following you"},
};

// ✅ أيقونة حسب نوع الـ notification
function NotifIcon({type}) {
  const map = {
    like_post: {icon: <Heart size={14} />, bg: "bg-pink-500/10 text-pink-500"},
    comment_post: {
      icon: <MessageCircle size={14} />,
      bg: "bg-primary/10 text-primary",
    },
    share_post: {
      icon: <Repeat2 size={14} />,
      bg: "bg-green-500/10 text-green-500",
    },
    follow: {icon: <UserPlus size={14} />, bg: "bg-sky-500/10 text-sky-500"},
  };
  const item = map[type] || {
    icon: <Bell size={14} />,
    bg: "bg-muted text-muted-foreground",
  };

  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.bg}`}
    >
      {item.icon}
    </div>
  );
}

export default function Notifications() {
  const {setUnreadCount} = useContext(AuthConText);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);
  const navigate = useNavigate();

  async function fetchNotifications() {
    const res = await getNotifications();
    if (res?.success) {
      const notifs = res.data?.notifications || [];
      setNotifications(notifs);
      setUnreadCount(notifs.filter((n) => !n.isRead).length);
    }
    setLoading(false);
  }

  async function handleMarkAsRead(notifId) {
    const res = await markAsRead(notifId);
    if (res?.success) {
      setNotifications((prev) =>
        prev.map((n) => (n._id === notifId ? {...n, isRead: true} : n)),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
  }

  async function handleMarkAllAsRead() {
    setMarkingAll(true);
    const res = await markAllAsRead();
    if (res?.success) {
      setNotifications((prev) => prev.map((n) => ({...n, isRead: true})));
      setUnreadCount(0);
    }
    setMarkingAll(false);
  }
  function handleNotifClick(notif) {
    // ✅ Mark as read
    if (!notif.isRead) handleMarkAsRead(notif._id);

    // ✅ Navigate للـ post
    if (notif.entityType === "post" && notif.entityId) {
      navigate(`/single-post/${notif.entityId}`);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (loading) return <LoadingScrean />;

  return (
    <div className="max-w-2xl mx-auto  px-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-foreground">Notifications</h1>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              {unreadCount}
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            disabled={markingAll}
            className="
              cursor-pointer text-xs font-medium
              text-primary hover:opacity-75
              disabled:opacity-50 transition
            "
          >
            {markingAll ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              "Mark all as read"
            )}
          </button>
        )}
      </div>

      {/* List */}
      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
        {notifications.length === 0 ? (
          <div className="py-16 text-center px-4">
            <div className="w-12 h-12 mx-auto mb- rounded-2xl bg-accent flex items-center justify-center text-accent-foreground">
              <Bell size={20} />
            </div>
            <h3 className="text-sm font-medium text-foreground mb-1">
              No notifications yet
            </h3>
            <p className="text-xs text-muted-foreground">
              You're all caught up!
            </p>
          </div>
        ) : (
          notifications.map((notif, index) => {
            const config = NOTIF_CONFIG[notif.type] || {};
            return (
              <div
                key={notif._id}
                onClick={() => handleNotifClick(notif)}
                className={`
                flex items-start gap-3 px-5 py-5
                cursor-pointer transition-all duration-200
                hover:bg-muted/50
                ${!notif?.isRead ? "bg-primary/5" : ""}
                ${index !== notifications.length - 1 ? "border-b border-border/60" : ""}
              `}
              >
                {/* Sender Avatar */}
                <div className="relative shrink-0">
                  <img
                    src={notif?.actor?.photo}
                    alt={notif?.actor?.name}
                    className="w-10 h-10 rounded-full object-cover border border-border"
                  />
                  {/* Notif Type Icon */}
                  <div className="absolute -bottom-2 left-2 -translate-x-6">
                    <NotifIcon type={notif?.type} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-sm text-foreground leading-snug">
                    <span className="font-semibold">{notif?.actor?.name}</span>{" "}
                    <span className="text-muted-foreground">{config.text}</span>
                  </p>
                  <span className="text-[11px] text-muted-foreground/70 mt-0.5 block">
                    {new Date(notif?.createdAt).toLocaleString()}
                  </span>
                </div>

                {/* Unread dot */}
                {!notif?.isRead && (
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

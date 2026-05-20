// PeopleYouMayKnow.jsx — مع design system colors
import React, {useContext, useEffect, useState} from "react";
import {Loader2, Sparkles, UserPlus2} from "lucide-react";
import {followUser, getFollowSuggestions} from "@/Services/FollowService";
import { AuthConText } from "@/Context/AuthConText";

export default function PeopleYouMayKnow() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followingUsers, setFollowingUsers] = useState([]);
const { setUserData } = useContext(AuthConText)
  async function fetchSuggestions() {
    setLoading(true);
    const res = await getFollowSuggestions();

    if (res?.success) {
      // ✅ success صح هنا لأن الـ API فعلاً بيرجع success: true
      setUsers(res?.data?.suggestions || []); // ✅ suggestions مش users
    }
    setLoading(false);
  }

  async function handleFollow(userId) {
    setFollowingUsers((prev) => [...prev, userId]);
    const res = await followUser(userId);

    if (res?.message) {
      setUsers((prev) => prev.filter((u) => u._id !== userId));
       setUserData((prev) => ({
        ...prev,
        followingCount: (prev?.followingCount || 0) + 1,
      }));
    
    }
    setFollowingUsers((prev) => prev.filter((id) => id !== userId));
  }

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <aside className=" rounded-3xl border border-border bg-card shadow-xl">
      {/* Header */}
      <div className="rounded-3xl flex items-center gap-3 px-5 py-4 border-b border-border bg-accent/30">
        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-accent text-accent-foreground">
          <Sparkles size={18} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            People You May Know
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Discover new people
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-14">
          <Loader2 size={24} className="animate-spin text-primary" />
        </div>
      ) : users?.length > 0 ? (
        <div className="p-4 space-y-2 max-h-[calc(100vh-14rem)] overflow-y-auto scrollbar-hide">
          {users.map((user) => {
            const isFollowing = followingUsers.includes(user._id);

            return (
              <div
                key={user._id}
                className="
                  flex items-center justify-between gap-3
                  rounded-2xl border border-transparent
                  bg-muted/50 p-3
                  hover:border-border hover:bg-muted
                  transition-all duration-200
                "
              >
                {/* Avatar + Info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={user?.photo}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-border"
                    />
                    <span
                      className="
                      absolute bottom-0 right-0
                      w-2.5 h-2.5 rounded-full
                      bg-green-500 border-2 border-card
                    "
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {user?.name}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      @{user?.username}
                    </p>
                    {/* ✅ بيانات إضافية من الـ API */}
                    <p className="text-xs text-muted-foreground/70 mt-0.5">
                      {user?.mutualFollowersCount > 0
                        ? `${user.mutualFollowersCount} mutual • ${user.followersCount} followers`
                        : `${user.followersCount} followers`}
                    </p>
                  </div>
                </div>

                {/* Follow Button */}
                <button
                  onClick={() => handleFollow(user._id)}
                  disabled={isFollowing}
                  className="
                    shrink-0 cursor-pointer
                    flex items-center gap-1.5
                    px-3 py-2 rounded-xl
                    bg-primary text-primary-foreground
                    text-xs font-semibold
                    hover:opacity-90 hover:scale-[1.02]
                    active:scale-95
                    disabled:opacity-60 disabled:cursor-not-allowed
                    transition-all duration-200
                  "
                >
                  {isFollowing ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <>
                      <UserPlus2 size={14} />
                      Follow
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-14 text-center px-4">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-accent flex items-center justify-center text-accent-foreground">
            <Sparkles size={20} />
          </div>
          <h3 className="text-sm font-medium text-foreground mb-1">
            No Suggestions Yet
          </h3>
          <p className="text-xs text-muted-foreground">
            Suggested users will appear here.
          </p>
        </div>
      )}
    </aside>
  );
}

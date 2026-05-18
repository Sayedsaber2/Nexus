import {AuthConText} from "@/Context/AuthConText";
import {
  BookmarkUnbookmarkPost,
  LikeUnlikePost,
  SharePost,
} from "@/Services/LikesService";
import {
  Bookmark,
  Heart,
  Loader2,
  MessageCircle,
  Repeat2,
  X,
} from "lucide-react";
import React, {useContext, useState} from "react";
import {createPortal} from "react-dom";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";

export default function PostFooter({
  toggleComments,
  handleShowLikes,
  post,
  originalPost,
  commentsCount
}) {
  const {userData} = useContext(AuthConText);
  const [likesCount, setLikesCount] = useState(originalPost?.likesCount || 0);
  const [isLiked, setIsLiked] = useState(
    originalPost?.likes?.includes(userData?._id),
  );

  const [isBookmarked, setIsBookmarked] = useState(post?.bookmarked || false);

  const [sharesCount, setSharesCount] = useState(
    originalPost?.sharesCount || 0,
  );
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareBody, setShareBody] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  async function handleLike(postId) {
    setIsLiked((prev) => !prev);

    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

    const res = await LikeUnlikePost(postId);

    // sync with backend
    if (res?.success) {
      setIsLiked(res.data.liked);
      setLikesCount(res.data.likesCount);
    }
  }

  async function handleBookmark(postId) {
    setIsBookmarked((prev) => !prev);

    const res = await BookmarkUnbookmarkPost(postId);
    if (res?.success) {
      setIsBookmarked(res.data.bookmarked);
    }
    if (res.data.bookmarked) {
      toast.success("Post saved to bookmarks");
    } else {
      toast.error("Removed from bookmarks");
    }
  }

  async function handleShare() {
    setIsSharing(true);

    const res = await SharePost(originalPost?._id, shareBody);

    if (res?.success) {
      setSharesCount((prev) => prev + 1); // ✅ تحديث محلي بس
      setShowShareModal(false);
      setShareBody("");
      toast.success("Post shared successfully!");
    }

    setIsSharing(false);
  }

  function handleCommentChange(value) {
  setCommentsCount((prev) => prev + value); // ✅ +1 أو -1
}
  return (
    <>
      <div
        className="
                  flex items-center justify-between
                  pt-2
                  border-t border-border/60
                "
      >
        {/* Like */}
        <div className="flex items-center gap-1">
          {/* Like Button */}
          <button
            onClick={() => handleLike(originalPost?._id)}
            className={`
    cursor-pointer group/action
    flex items-center justify-center
    w-9 h-9 rounded-xl
    active:scale-95 transition-all duration-200
    ${
      isLiked
        ? "bg-pink-500/10 text-pink-500" // ✅ background + color
        : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
    }
  `}
          >
            <Heart
              size={18}
              className={`
              transition-all duration-200
              group-hover/action:scale-110

              ${
                isLiked
                  ? "fill-pink-500 text-pink-500"
                  : "text-muted-foreground"
              }
            `}
            />
          </button>

          {/* Likes Count */}
          <button
            onClick={() => handleShowLikes(originalPost?._id)}
            className="
          cursor-pointer
                        text-xs font-medium
                        text-muted-foreground
                        hover:text-primary
                        transition
                      "
          >
            {likesCount}
          </button>
        </div>

        {/* Comment */}
        <div className="flex items-center gap-1">
          {/* Comment Icon */}
          <button
            onClick={() => toggleComments(post?._id)}
            className="
          cursor-pointer
                      group/action
                      flex items-center justify-center
                      w-9 h-9
                      rounded-xl
                      text-muted-foreground
                      hover:bg-primary/10
                      hover:text-primary
                      active:scale-95
                      transition-all duration-200
                    "
          >
            <MessageCircle
              size={18}
              className="
                      transition-transform duration-200
                      group-hover/action:scale-110
                    "
            />
          </button>

          {/* Comments Count */}
          <Link to={"/single-post/" + post._id}>
            <span className="text-xs font-medium text-muted-foreground">
              {commentsCount}
            </span>
          </Link>
        </div>

        {/* Share */}
        <button
          onClick={() => setShowShareModal(true)}
          className="
        cursor-pointer
                    group/action
                    flex items-center gap-1.5
                    px-3 py-1.5
                    rounded-xl
                    text-muted-foreground
                    hover:bg-primary/10
                    hover:text-primary
                    active:scale-95
                    transition-all duration-200
                  "
        >
          <Repeat2
            size={18}
            className="
                      transition-transform duration-200
                      group-hover/action:scale-110
                    "
          />

          <span className="text-xs font-medium">{sharesCount}</span>
          </button>

          {/* Bookmark */}
        <button
          onClick={() => handleBookmark(post?._id)}
          className={`
          cursor-pointer flex items-center justify-center
          w-9 h-9 rounded-xl
          active:scale-100 transition-all duration-200
          ${
            isBookmarked
              ? "bg-primary/10 text-primary file-primary"
              : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
          }
        `}
        >
          <Bookmark
            className={`
    transition-all duration-200
    group-hover/action:scale-110
    ${isBookmarked ? "fill-primary text-primary" : "text-muted-foreground"}
  `}
            size={18}
            fill={post?.bookmarked ? "currentColor" : "none"}
          />
        </button>
        </div>
        {showShareModal &&
        createPortal(
          <div
            className=" fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
          >
            <div
              className="w-full max-w-md bg-card border border-border rounded-3xl p-5 shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">
                  Share Post
                </h2>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Preview للبوست الأصلي */}
              <div className="rounded-2xl border border-border bg-muted/30 p-3 space-y-1">
                <div className="flex items-center gap-2">
                  <img
                    src={originalPost?.user?.photo}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-xs font-medium text-foreground">
                    {originalPost?.user?.name}
                  </span>
                </div>
                {originalPost?.body && (
                  <p className="text-xs text-muted-foreground line-clamp-2 pl-9">
                    {originalPost?.body}
                  </p>
                )}
              </div>

              {/* Caption Input */}
              <textarea
                value={shareBody}
                onChange={(e) => setShareBody(e.target.value)}
                placeholder="Write a caption... "
                rows={3}
                className="
              w-full resize-none
              bg-muted/50 border border-border
              rounded-2xl px-4 py-3
              text-sm text-foreground
              placeholder:text-muted-foreground
              focus:outline-none focus:ring-2 focus:ring-primary/30
              transition
            "
              />

              {/* Actions */}
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowShareModal(false)}
                  className=" cursor-pointer px-4 py-2 rounded-xl text-xs border border-border text-muted-foreground hover:bg-muted transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleShare}
                  disabled={isSharing || !shareBody.trim()}
                  className="
               cursor-pointer
                 px-4 py-2 rounded-xl text-xs font-semibold
                 bg-linear-to-br from-[#7C5CFC] to-[#FC5CA8]
                  text-primary-foreground
                 hover:opacity-90 active:scale-95
                 disabled:opacity-60 disabled:cursor-not-allowed
                 transition-all duration-200
               "
                >
                  {isSharing ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    "Share"
                  )}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

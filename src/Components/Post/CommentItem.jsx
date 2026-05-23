// CommentItem.jsx

import {ChevronDown, ChevronUp, Heart} from "lucide-react";
import {useContext, useState} from "react";
import {AuthConText} from "@/Context/AuthConText";
import {LikeUnlikeComment} from "@/Services/LikesService";
import { CreateReply, getCommentReplies } from "@/Services/CommentService";

export default function CommentItem({
  comment,
  post,
  isOwner,
  isEditing,
  editContent,
  setEditContent,
  setEditingCommentId,
  handleUpdateComment,
  handleDeleteComment,
}) {
  const {userData} = useContext(AuthConText);

  const [isLiked, setIsLiked] = useState(
    comment?.likes?.includes(userData?._id),
  );
  const [likesCount, setLikesCount] = useState(comment?.likes?.length || 0);

  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [repliesLoading, setRepliesLoading] = useState(false);

  async function handleLike() {
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

    const res = await LikeUnlikeComment(post._id, comment._id);

    if (res?.success) {
      setIsLiked(res.data.liked);
      setLikesCount(res.data.likesCount);
    }
  }
async function handleShowReplies() {
    if (showReplies) {
      setShowReplies(false);
      return;
    }
    setRepliesLoading(true);
    const res = await getCommentReplies(post._id, comment._id);
    if (res?.success) {
      setReplies(res.data?.replies || []);
    }
    setRepliesLoading(false);
    setShowReplies(true);
  }

 async function handleCreateReply(e) {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setSendingReply(true);
    const res = await CreateReply(post._id, comment._id, replyContent);

    if (res?.success) {
      setReplies((prev) => [...prev, res.data?.reply]);
      setReplyContent("");
      setShowReplies(true);
      setShowReplyInput(false);
    }
    setSendingReply(false);
  }
  return (
    <div className="flex gap-2">
      <img
        src={comment?.commentCreator?.photo}
        alt="user"
        className="w-8 h-8 rounded-full object-cover border border-border/50"
      />
 <div className="flex-1 min-w-0">
      <div className="flex-1 bg-muted/60 border border-border/50 rounded-2xl px-3 py-2 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xs font-semibold text-foreground">
            {comment?.commentCreator?.name}
          </h3>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <span>{new Date(comment?.createdAt).toLocaleDateString()}</span>
            <span>{new Date(comment?.createdAt).toLocaleTimeString()}</span>
          </div>
        </div>

        {isEditing ? (
          <div className="flex items-center gap-2 mt-2">
            <input
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="flex-1 bg-muted border border-border rounded-xl px-3 py-1.5 text-sm outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition"
            />
            <button
              onClick={() => handleUpdateComment(comment._id)}
              className="cursor-pointer text-[11px] text-primary hover:opacity-80 transition font-medium"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditingCommentId(null);
                setEditContent("");
              }}
              className="cursor-pointer text-[11px] text-muted-foreground hover:text-foreground transition"
            >
              Cancel
            </button>
          </div>
        ) : (
          <p className="text-sm text-foreground/85 leading-relaxed">
            {comment?.content}
          </p>
        )}

        <div className="flex items-center gap-3 mt-3">
          {/* ✅ Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 text-[11px] transition cursor-pointer 
              ${isLiked ? "text-pink-500" : "text-muted-foreground hover:text-pink-400"}
            `}
          >
            <Heart size={13} className={isLiked ? "fill-pink-500" : ""} />
            <span>{likesCount}</span>
          </button>

          <button onClick={() => setShowReplyInput((p) => !p)} className="cursor-pointer text-[11px] text-muted-foreground hover:text-primary transition">
            Reply
          </button>
          {comment?.repliesCount > 0 && (
              <button
                type="button"
                onClick={handleShowReplies}
                className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition"
              >
                {showReplies ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                {repliesLoading ? "Loading..." : `${comment.repliesCount} ${comment.repliesCount === 1 ? "reply" : "replies"}`}
              </button>
            )}

            {isOwner && (
              <>
                <button
                  type="button"
                  onClick={() => { setEditingCommentId(comment._id); setEditContent(comment.content); }}
                  className="cursor-pointer text-[11px] text-muted-foreground hover:text-sky-400 transition"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteComment(comment._id)}
                  className="cursor-pointer text-[11px] text-muted-foreground hover:text-red-400 transition"
                >
                  Delete
                </button>
              </>
            )}
        </div>
      </div>
      {showReplyInput && (
          <form onSubmit={handleCreateReply} className="flex items-center gap-2 mt-2 pl-2">
            <input
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              className="
                flex-1 bg-muted border border-border
                rounded-2xl px-3 py-1.5 text-xs outline-none
                focus:border-primary/40 focus:ring-2 focus:ring-primary/10
                transition
              "
            />
            <button
              type="submit"
              disabled={sendingReply || replyContent.length < 1}
              className="
                cursor-pointer px-3 py-1.5 rounded-xl
                text-xs font-semibold text-white
                bg-linear-to-br from-[#7C5CFC] to-[#FC5CA8]
                hover:opacity-90 disabled:opacity-60
                transition-all duration-200
              "
            >
              {sendingReply ? "..." : "Send"}
            </button>
            <button
              type="button"
              onClick={() => { setShowReplyInput(false); setReplyContent(""); }}
              className="cursor-pointer text-[11px] text-muted-foreground hover:text-foreground transition"
            >
              Cancel
            </button>
          </form>
        )}
         {showReplies && replies.length > 0 && (
          <div className="mt-2 pl-4 space-y-2 border-l-2 border-border/40">
            {replies.map((reply) => (
              <div key={reply._id} className="flex gap-2">
                <img
                  src={reply?.commentCreator?.photo}
                  alt="user"
                  className="w-6 h-6 rounded-full object-cover border border-border/50 shrink-0"
                />
                <div className="flex-1 bg-muted/40 border border-border/40 rounded-xl px-3 py-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-foreground">
                      {reply?.commentCreator?.name}
                    </h4>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(reply?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/85 mt-0.5">{reply?.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
    </div>
  );
}

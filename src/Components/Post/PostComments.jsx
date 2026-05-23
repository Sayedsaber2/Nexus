import {
  CreateComment,
  DeleteComment,
  UpdateComment,
} from "@/Services/CommentService";
import {AuthConText} from "@/Context/AuthConText";
import {Button} from "@heroui/react";
import {Heart, SendHorizontal} from "lucide-react";
import React, {useContext, useState} from "react";
import toast from "react-hot-toast";
import CommentItem from "./CommentItem";

export default function PostComments({
  openComments,
  post,
  comments,
  isSinglePost,
  onCommentChange,
}) {
  const {userData} = useContext(AuthConText);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [CommentContent, setCommentContent] = useState("");
  const [loading, setloading] = useState(false);
  const [allComments, setAllComments] = useState(
    comments?.length > 0 ? comments : post?.topComment ? [post.topComment] : [],
  );

  async function handleCreateComment(e) {
    e.preventDefault();
    if (!CommentContent.trim()) return;
    setloading(true);
    const response = await CreateComment(post._id, CommentContent);

    if (response?.success) {
      const newComment = response?.data?.comment;
      if (newComment) {
        setAllComments((prev) => [newComment, ...prev]);
        onCommentChange?.(1);
      }
      setCommentContent("");
    }
    setloading(false);
  }

  async function handleDeleteComment(commentId) {
    const res = await DeleteComment(post._id, commentId);

    if (res?.success) {
      setAllComments((prev) => prev.filter((c) => c._id !== commentId));

      toast.success("Comment deleted");
      onCommentChange?.(-1);
    } else {
      toast.error(res?.message || "Something went wrong");
    }
  }
  async function handleUpdateComment(commentId) {
    if (!editContent.trim()) return;

    const res = await UpdateComment(post._id, commentId, editContent);

    if (res?.success) {
      setAllComments((prev) =>
        prev.map((c) =>
          c._id === commentId ? {...c, content: editContent} : c,
        ),
      );
      setEditingCommentId(null);
      setEditContent("");
      toast.success("Comment updated");
    } else {
      toast.error(res?.message || "Something went wrong");
    }
  }
  return (
    <div>
      {(isSinglePost || openComments[post?._id]) && (
        <div className="space-y-3 pt-3 border-t border-border/60">
          {/* Add Comment */}
          <form
            onSubmit={handleCreateComment}
            className="flex items-center gap-2"
          >
            <input
              value={CommentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              type="text"
              placeholder="Write a comment..."
              className="
                flex-1 bg-muted border border-border
                rounded-2xl px-4 py-2 text-sm outline-none
                focus:border-primary/40 focus:ring-2 focus:ring-primary/10
                transition
              "
            />
            <Button
              type="submit"
              isPending={loading}
              isDisabled={CommentContent.length < 2}
              className="
                w-10 h-10 rounded-2xl text-primary
                flex items-center justify-center
                hover:bg-linear-to-r hover:from-[#8B5CF6] hover:to-[#FC5CA8]
                hover:text-white transition
              "
            >
              <SendHorizontal size={16} />
            </Button>
          </form>

          {/* Comments List */}
          {allComments?.length > 0 ? (
            allComments.map((comment) => {
              // ✅ بس صاحب الكومنت يشوف Delete
              const isOwner = userData?._id === comment?.commentCreator?._id;
              const isEditing = editingCommentId === comment._id;

              return (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  post={post}
                  isOwner={userData?._id === comment?.commentCreator?._id}
                  isEditing={editingCommentId === comment._id}
                  editContent={editContent}
                  setEditContent={setEditContent}
                  setEditingCommentId={setEditingCommentId}
                  handleUpdateComment={handleUpdateComment}
                  handleDeleteComment={handleDeleteComment}
                />
              );
            })
          ) : (
            <div className="text-center py-3">
              <p className="text-xs text-muted-foreground">No comments yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import {CreateComment, DeleteComment, UpdateComment} from "@/Services/CommentService";
import {AuthConText} from "@/Context/AuthConText";
import {Button} from "@heroui/react";
import {Heart, SendHorizontal} from "lucide-react";
import React, {useContext, useState} from "react";
import toast from "react-hot-toast";

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
        c._id === commentId
          ? { ...c, content: editContent }
          : c
      )
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
                <div key={comment?._id} className="flex gap-2">
                  <img
                    src={comment?.commentCreator?.photo}
                    alt="user"
                    className="w-8 h-8 rounded-full object-cover border border-border/50"
                  />

                  <div
                    className="
                    flex-1 bg-muted/60 border border-border/50
                    rounded-2xl px-3 py-2 backdrop-blur-sm
                  "
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xs font-semibold text-foreground">
                        {comment?.commentCreator?.name}
                      </h3>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span>
                          {new Date(comment?.createdAt).toLocaleDateString()}
                        </span>
                        <span>
                          {new Date(comment?.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>

                    {isEditing ? (
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="
                flex-1 bg-muted border border-border
                rounded-xl px-3 py-1.5 text-sm outline-none
                focus:border-primary/40 focus:ring-2 focus:ring-primary/10
                transition
              "
                        />
                        <button
                          onClick={() => handleUpdateComment(comment._id)}
                          className=" cursor-pointer text-[11px] text-primary hover:opacity-80 transition font-medium"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingCommentId(null);
                            setEditContent("");
                          }}
                          className="text-[11px] cursor-pointer text-muted-foreground hover:text-foreground transition"
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
                      <button className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-pink-400 transition">
                        <Heart size={13} />
                        <span>{comment?.likes?.length || 0}</span>
                      </button>

                      <button className="text-[11px] text-muted-foreground hover:text-primary transition">
                        Reply
                      </button>

                      {isOwner && (
                        <>
                          <button
                            onClick={() => {
                              setEditingCommentId(comment._id);
                              setEditContent(comment.content); // ✅ ابدأ بالنص الحالي
                            }}
                            className="cursor-pointer text-[11px] text-muted-foreground hover:text-sky-400 transition"
                          >
                            Update
                          </button>

                          <button
                            onClick={() => handleDeleteComment(comment._id)}
                            className="cursor-pointer text-[11px] text-muted-foreground hover:text-red-400 transition"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
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

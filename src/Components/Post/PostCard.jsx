import {
  Bookmark,
  Heart,
  Loader2,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  SendHorizontal,
} from "lucide-react";
import React, { useState } from "react";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import PostComments from "./PostComments";
import { Link, useNavigate } from "react-router-dom";
import { DeletePost } from "@/Services/PostService";
import toast from "react-hot-toast";

export default function PostCard({
  post,
  comments,
  originalPost,
  openComments,
  toggleComments,
  handleShowLikes,
  setSelectedImage,
  isSinglePost,
  onPostDeleted,
}) {
  const navigate = useNavigate()
  const [commentsCount, setCommentsCount] = useState(originalPost?.commentsCount || 0)
  const [isDeleting, setIsDeleting] = useState(false)
const [isEditing, setIsEditing] = useState(false);
const [postBody, setPostBody] = useState(originalPost?.body || "");
const [postImage, setPostImage] = useState(originalPost?.image || "")
   async function handleDelete() {
    setIsDeleting(true);
    const res = await DeletePost(post._id);

    if (res?.success) {
    toast.success("Post deleted successfully");

    if (isSinglePost) {
      navigate("/"); 
    } else {
      onPostDeleted?.(post._id);
    }
  } else {
    toast.error(res?.message || "Something went wrong");
  }
    setIsDeleting(false);
  }
function handleCommentChange(value) {
  setCommentsCount((prev) => prev + value);
}

function handleEditDone(newBody, newImage) {
  if (newBody) setPostBody(newBody); // ✅ حدّث النص لو save
  if (newImage) setPostImage(newImage) 
  setIsEditing(false);              // ✅ اقفل الـ edit mode دايماً
}
  return (
    <div
      className="
      relative
                group
                bg-card
                border border-border/70
                rounded-3xl
                p-4
                space-y-4
                shadow-lg
                backdrop-blur-xl
                transition-all duration-300
                hover:border-primary/30
                hover:shadow-[0_8px_30px_rgba(124,92,252,0.10)]
              "
    >

      {isDeleting && (
        <div className="
          absolute inset-0 z-10
          bg-card/80 backdrop-blur-sm
          rounded-3xl
          flex items-center justify-center
        ">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 size={18} className="animate-spin" />
            <span className="text-sm">Deleting...</span>
          </div>
        </div>
      )}
      <PostHeader onEdit={() => setIsEditing(true)} onDelete={handleDelete} isDeleting={isDeleting} originalPost={originalPost} post={post} />


      <PostBody
       isEditing={isEditing}
  onEditDone={handleEditDone}
      post={post}
        originalPost={{ ...originalPost, body: postBody,image: postImage  }}
        setSelectedImage={setSelectedImage}
      />

      
     <PostFooter commentsCount={commentsCount} post={post} toggleComments={toggleComments} originalPost={originalPost} handleShowLikes={handleShowLikes}/>

      {/* Comments */}
      <PostComments onCommentChange={handleCommentChange} isSinglePost={isSinglePost} post={post} openComments={openComments} comments={comments} />
    </div>
  );
}

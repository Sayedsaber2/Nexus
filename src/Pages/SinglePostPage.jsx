import LoadingScrean from "@/Components/LoadingScrean";
import PostCard from "@/Components/Post/PostCard";
import {getPostComments} from "@/Services/CommentService";
import {getLikesPosts, getSinglePost} from "@/Services/PostService";
import { X } from "lucide-react";
import React from "react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function SinglePostPage() {
  const {id} = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
    const [showLikes, setShowLikes] = useState(false);
  const [likedUsers, setLikedUsers] = useState([]);

  
  const [comments, setComments] = useState([]);
  
  async function handleShowLikes(postId) {
      const res = await getLikesPosts(postId);
  
      if (res?.data?.likes) {
        setLikedUsers(res.data.likes);
        setShowLikes(true);
      }
    }
  async function getPost() {
    const response = await getSinglePost(id);

    if (response?.message === "success") {
      setPost(response?.data?.post);
    }
    const res = await getPostComments(id);

    if (res?.message === "success") {
    setComments(res?.data?.comments);
  }
    setLoading(false);
  }

  useEffect(() => {
    getPost();
  }, [id]);

  if (loading || !post) return <LoadingScrean />;

  const originalPost = post?.isShare ? post?.sharedPost : post;

  return (
    <>
    
    {/* Likes Modal */}
      {showLikes && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/60 backdrop-blur-sm
            flex items-center justify-center
            p-4
            "
          onClick={() => setShowLikes(false)}
        >
          <div
            className="
              w-full max-w-sm
              bg-card
              border border-border
              rounded-3xl
              p-4
              shadow-2xl
              "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Likes</h2>

              <button
                onClick={() => setShowLikes(false)}
                className="
                  w-8 h-8
                  flex items-center justify-center
                  rounded-xl
                  text-muted-foreground
                  hover:bg-primary/10
                  hover:text-primary
                  transition
                  "
              >
                <X size={18} />
              </button>
            </div>

            {/* Users */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {likedUsers?.length > 0 ? (
                likedUsers.map((user) => (
                  <div
                    key={user?._id}
                    className="
                      flex items-center gap-3
                      p-2 rounded-2xl
                      hover:bg-muted/50
                      transition
                    "
                  >
                    <img
                      src={user?.photo}
                      alt={user?.name}
                      className="
                        w-10 h-10
                        rounded-full
                        object-cover
                      "
                    />

                    <div>
                      <h3 className="text-sm font-medium text-foreground">
                        {user?.name}
                      </h3>

                      <p className="text-xs text-muted-foreground">
                        @{user?.username}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-6">
                  No likes yet
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    <div className="w-[60%] mx-auto my-4 space-y-4">
      <PostCard
        post={post}
        originalPost={originalPost}
        comments={comments}
        openComments={{}}
        toggleComments={() => {}}
        handleShowLikes={handleShowLikes}
        setSelectedImage={() => {}}
        isSinglePost={true}
        
      />
      
    </div>
    </>
  );
}

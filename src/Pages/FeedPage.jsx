import React, {useEffect, useState} from "react";
import {X} from "lucide-react";
// ونخلص الكريت واالابديت والدليت البوست والكومينت ونخص ال ui من الجنبين
import {getLikesPosts, getPosts} from "@/Services/PostService";
import LoadingScrean from "@/Components/LoadingScrean";
import CreatePost from "@/Components/Post/CreatePost";
import PostCard from "@/Components/Post/PostCard";
import PeopleYouMayKnow from "@/Components/FollowSuggestions";
export default function FeedPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLikes, setShowLikes] = useState(false);
  const [likedUsers, setLikedUsers] = useState([]);
  const [openComments, setOpenComments] = useState({});
  async function getAllPosts() {
    try {
      const response = await getPosts();

      if (response?.message) {
        setPosts(response?.data?.posts || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function handleShowLikes(postId) {
    const res = await getLikesPosts(postId);

    if (res?.data?.likes) {
      setLikedUsers(res.data.likes);
      setShowLikes(true);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  function toggleComments(postId) {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  }

  function handlePostDeleted(postId) {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  }
  if (isLoading) {
    return (
      <div className="space-y-4 max-w-2xl mx-auto">
        <LoadingScrean />
        <LoadingScrean />
        <LoadingScrean />
      </div>
    );
  }

  return (
    <>
      <CreatePost getAllPosts={getAllPosts} />
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

      {selectedImage && (
        <div
          className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50
        backdrop-blur-md
      "
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="
          max-w-[95%]
          max-h-[95%]
          rounded-2xl
          shadow-2xl
          object-contain
        "
          />
        </div>
      )}

      <div className="relative flex justify-center px-4">
        {/* Feed — centered */}
        <div className="w-full max-w-2xl space-y-4">
          {posts?.map((post) => {
            const originalPost = post?.isShare ? post?.sharedPost : post;
            return (
              <PostCard
                key={post._id}
                post={post}
                originalPost={originalPost}
                openComments={openComments}
                toggleComments={toggleComments}
                handleShowLikes={handleShowLikes}
                setSelectedImage={setSelectedImage}
                isSinglePost={false}
                onPostDeleted={handlePostDeleted}
              />
            );
          })}
        </div>

        {/* Right Sidebar — fixed to far right */}
        <div className="hidden xl:block fixed top-24 right-6 w-80">
          <PeopleYouMayKnow />
        </div>
      </div>
    </>
  );
}

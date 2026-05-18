import {useContext, useEffect, useRef, useState} from "react";
import {AuthConText} from "@/Context/AuthConText";
import LoadingScrean from "@/Components/LoadingScrean";
import {
  getLikesPosts,
  getUserPosts,
  UploadProfilePhoto,
} from "@/Services/PostService";
import PostCard from "@/Components/Post/PostCard";
import {CameraIcon, X} from "lucide-react";

export default function ProfilePage() {
  const {userData, setUserData} = useContext(AuthConText);
  const [previewImage, setPreviewImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [openComments, setOpenComments] = useState({});
  const [showLikes, setShowLikes] = useState(false);
  const [likedUsers, setLikedUsers] = useState([]);

  async function handleProfileImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    // preview only
    setPreviewImage(URL.createObjectURL(file));

    // خزّن الصورة مؤقت
    setSelectedFile(file);
  }

  async function uploadProfileImage() {
    if (!selectedFile) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("photo", selectedFile);

      const response = await UploadProfilePhoto(formData);
      console.log(response);
      if (response?.success) {
        setUserData((prev) => ({
          ...prev,
          photo: response.data.photo,
        }));

        setPreviewImage("");
        setSelectedFile(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  }
  useEffect(() => {
    if (userData?._id) {
      fetchPosts();
    }
  }, [userData]);

  async function fetchPosts() {
    const res = await getUserPosts(userData._id);

    if (res?.success) {
      setPosts(res.data.posts);
    }
  }
  function toggleComments(postId) {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  }
  async function handleShowLikes(postId) {
    const res = await getLikesPosts(postId);

    if (res?.data?.likes) {
      setLikedUsers(res.data.likes);
      setShowLikes(true);
    }
  }

  function handlePostDeleted(postId) {
  setPosts((prev) => prev.filter((p) => p._id !== postId));
}
  if (!userData) {
    return <LoadingScrean />;
  }

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
      <div className="max-w-3xl mx-auto mt-4 space-y-6">
        {/* Cover */}
        <div className="h-40 rounded-3xl bg-linear-to-r from-[#8B5CF6] to-[#FC5CA8] mb-2" />

        {/* Profile Card */}
        <div className="bg-card border border-border rounded-3xl p-5 shadow-lg relative m-0">
          <div className="flex flex-col items-start -mt-16 -ml-2">
            {/* AVATAR */}
            <div className="relative group w-24 h-24">
              <img
                src={previewImage || userData?.photo}
                className="
                  w-24 h-24
                  rounded-full
                  border-4 border-card
                  object-cover
                "
                alt="profile"
              />
              {uploading && (
                <div className="absolute inset-0 rounded-full bg-black/30 backdrop-blur-[2px] flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                </div>
              )}
              {/* INPUT */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                id="profilePhoto"
                className="hidden"
                onChange={handleProfileImage}
              />

              {/* OVERLAY */}
              <label
                htmlFor="profilePhoto"
                className="
        absolute inset-0
        bg-black/50
        rounded-full
        opacity-0 group-hover:opacity-100
        transition
        flex flex-col
        items-center
        justify-center
        cursor-pointer
      "
              >
                <CameraIcon className="w-5 h-5 text-white" />

                <span className="text-[10px] text-white mt-1">Change</span>
              </label>
            </div>

            {/* ACTIONS */}
            {previewImage && (
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={uploadProfileImage}
                  className="
          px-3 py-1.5
          rounded-xl
          text-xs text-white
          bg-linear-to-r
          from-[#8B5CF6]
          to-[#FC5CA8]
          hover:opacity-80
          cursor-pointer
        "
                >
                  {uploading ? "Uploading..." : "Save"}
                </button>

                <button
                  onClick={() => {
                    setPreviewImage("");
                    setSelectedFile(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="
          px-3 py-1.5
          rounded-xl
          text-xs
          border border-border
          text-muted-foreground
          cursor-pointer
          hover:opacity-90
        "
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="ml-2 space-y-2">
            {/* Name */}
            <h1 className="text-xl font-bold text-foreground">
              {userData.name}
            </h1>

            {/* Username */}
            <p className="text-sm text-muted-foreground">
              @{userData.username}
            </p>

            {/* Email */}
            <p className="text-xs text-muted-foreground">{userData.email}</p>

            {/* Stats */}
            <div className="flex gap-6 mt-4">
              <div className="text-center">
                <p className="text-sm font-bold text-foreground">
                  {userData.followersCount}
                </p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>

              <div className="text-center">
                <p className="text-sm font-bold text-foreground">
                  {userData.followingCount}
                </p>
                <p className="text-xs text-muted-foreground">Following</p>
              </div>

              <div className="text-center">
                <p className="text-sm font-bold text-foreground">
                  {userData.bookmarksCount}
                </p>
                <p className="text-xs text-muted-foreground">Saved</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-3xl mx-auto space-y-4 mt-4">
          {posts.length === 0 ? (
            <p className="text-muted-foreground text-sm">No posts yet</p>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                originalPost={post?.isShare ? post?.sharedPost : post}
                openComments={openComments}
                toggleComments={toggleComments}
                handleShowLikes={handleShowLikes}
                setSelectedImage={() => {}}
                isSinglePost={false}
                onPostDeleted={handlePostDeleted}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

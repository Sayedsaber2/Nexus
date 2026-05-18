import {UpdatePost} from "@/Services/PostService";
import {ImageIcon, Loader2, X} from "lucide-react";
import {useState} from "react";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";

export default function PostBody({
  setSelectedImage,
  originalPost,
  post,
  isEditing, // ✅ هل دلوقتي في edit mode؟
  onEditDone, // ✅ callback للـ PostCard لما يخلص
}) {
  const [editBody, setEditBody] = useState(originalPost?.body || "");
  const [isSaving, setIsSaving] = useState(false);
  const [editImage, setEditImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  async function handleSave() {
    const formData = new FormData();
    if (editBody.trim()) formData.append("body", editBody); // ✅ بس لو فيه body
    if (editImage) formData.append("image", editImage);

     if (!editBody.trim() && !editImage) return;
    setIsSaving(true);

    const res = await UpdatePost(originalPost._id, formData);

    if (res?.success) {
      toast.success("Post updated!");
      onEditDone?.(
      editBody || originalPost?.body,
      res.data?.post?.image || previewImage || originalPost?.image
    );
  } else {
    toast.error(res?.message || "Something went wrong");
  }
    setIsSaving(false);
  }

  return (
    <div>
      {/* Body */}
      {isEditing ? (
        // ✅ لو isEditing = true يعرض textarea
        <div className="space-y-2">
          <textarea
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            rows={3}
            className="
              w-full resize-none
              bg-muted border border-border
              rounded-2xl px-4 py-3
              text-sm text-foreground
              placeholder:text-muted-foreground
              focus:outline-none focus:ring-2 focus:ring-primary/30
              transition
            "
          />
          {(previewImage || originalPost?.image) && (
            <div className="relative w-full">
              <img
                src={previewImage || originalPost?.image}
                className="w-full max-h-48 object-cover rounded-2xl border border-border"
              />
              {previewImage && (
                <button
                  onClick={() => {
                    setEditImage(null);
                    setPreviewImage(null);
                  }}
                  className="cursor-pointer absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          )}

          {/* Image Upload */}
          <label className="cursor-pointer flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition w-fit">
            <ImageIcon size={14} />
            Change Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                setEditImage(file);
                setPreviewImage(URL.createObjectURL(file));
              }}
            />
          </label>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="
                cursor-pointer px-4 py-1.5 rounded-xl
                text-xs font-semibold text-white
                bg-linear-to-br from-[#7C5CFC] to-[#FC5CA8]
                hover:opacity-90 active:scale-95
                disabled:opacity-60 disabled:cursor-not-allowed
                transition-all duration-200
              "
            >
              {isSaving ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                "Save"
              )}
            </button>

            <button
              onClick={() => onEditDone?.(null)} // ✅ null = cancel
              className="cursor-pointer px-4 py-1.5 rounded-xl text-xs border border-border text-muted-foreground hover:bg-muted transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // ✅ لو isEditing = false يعرض النص العادي
        <Link to={`/single-post/${post._id}`}>
          <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
            {originalPost?.body}
          </p>
        </Link>
      )}

      {/* Image */}
      {originalPost?.image && (
        <div className="mt-2 overflow-hidden rounded-2xl border border-border/70 bg-muted">
          <img
            src={originalPost?.image}
            alt="post"
            onClick={() => setSelectedImage(originalPost?.image)}
            className="
              w-full max-h-112.5 object-cover
              transition-transform duration-500
              hover:scale-[1.02] cursor-pointer
            "
          />
        </div>
      )}
    </div>
  );
}

import {useState} from "react";
import {CameraIcon, X} from "lucide-react";
import {Button} from "@heroui/react";
import {CreatePostApi} from "@/Services/PostService";

export default function CreatePost({getAllPosts}) {
  const [body, setbody] = useState("");
  const [image, setimage] = useState(null);
  const [loading, setloading] = useState(false);
  const [imageName, setimageName] = useState(null);
  const [imageUrl, setimageUrl] = useState("");
  function handelImage(e) {
    setimage(e?.target.files[0]);
    setimageName(e?.target.files[0].name);
    setimageUrl(e&&URL.createObjectURL(e.target.files[0]));
    if(e){
        e.target.value=''
    }
  }
  async function handelcreatePost(e) {
    e.preventDefault();
    setloading(true);
    const formData = new FormData();
    body && formData.append("body", body);
    image && formData.append("image", image);
    

    const response = await CreatePostApi(formData);
    if (response?.success) {
      setbody("");
      setimage(null);
      setimageUrl("")
      await getAllPosts();
    }
    setloading(false);
  }
  return (
    <div className="max-w-2xl mx-auto my-2">
      <form
        onSubmit={handelcreatePost}
        className="bg-card border border-border rounded-3xl p-4 space-y-3 shadow-lg"
      >
        {/* Textarea */}
        <textarea
          onChange={(e) => setbody(e.target.value)}
          value={body}
          placeholder="What's on your mind?"
          className="
        w-full
        min-h-24
        bg-muted
        border border-border
        rounded-2xl
        p-3
        text-sm
        text-foreground
        outline-none
        resize-none
        focus:ring-2
        focus:ring-[#8B5CF6]/30
        focus:border-[#8B5CF6]/40
        transition
        "
        />

        {/* Hidden Input */}
        <input
          onChange={handelImage}
          type="file"
          id="postImage"
          accept="image/*"
          className="hidden"
        />

        {/* Image Preview Placeholder */}
       {imageUrl && (
  <div className="relative w-full h-50 bg-muted/50 border border-border rounded-2xl overflow-hidden">
    
    <button
      type="button"
       onClick={()=>handelImage(null)}
      className=" cursor-pointer
        absolute top-2 right-2 z-10
        w-8 h-8
        flex items-center justify-center
        rounded-full
        bg-black/50
        text-white
        hover:bg-black/70
        transition
      "
    >
      <X size={18} />
    </button>

    <img
      src={imageUrl}
      alt="preview"
      className="w-full h-full object-cover"
    />
    
  </div>
)}

        {/* Actions */}
        <div className="flex items-center justify-between">
          {/* Upload */}
          <label
            htmlFor="postImage"
            className="flex items-center gap-2 text-muted-foreground cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-muted border border-border flex items-center justify-center group-hover:border-[#8B5CF6]/40 transition">
              <CameraIcon className="w-4 h-4 text-[#8B5CF6]" />
            </div>

            <span className="text-xs group-hover:text-foreground transition">
              Add Image
            </span>
          </label>

          {/* Post Button */}
          <Button
            type="submit"
            isDisabled={loading}
            isPending={loading}
            className="
          px-4 py-2
          rounded-2xl
          bg-linear-to-r from-[#8B5CF6] to-[#FC5CA8]
          text-white
          text-xs
          hover:opacity-90
          transition
        "
          >
            { "Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}

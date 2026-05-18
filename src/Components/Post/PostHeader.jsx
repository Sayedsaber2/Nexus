import { MoreHorizontal, PencilIcon, Repeat2, ShareIcon, TrashIcon } from "lucide-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "../ui/dropdown-menu";
import { AuthConText } from "@/Context/AuthConText";

export default function PostHeader({post,originalPost, onDelete, isDeleting,onEdit}) {
   const { userData } = useContext(AuthConText);

  // ✅ بس صاحب البوست يشوف الـ menu
  const isOwner = userData?._id === originalPost?.user?._id;
  return <div>
     {/* Shared Post */}
          {post?.isShare && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div
                className="
                          flex items-center justify-center
                          w-6 h-6
                          rounded-full
                          bg-accent
                          text-primary
                        "
              >
                <Repeat2 size={13} />
              </div>
    
              <span>
                <span className="text-foreground font-medium">
                  {post?.user?.name}
                </span>{" "}
                shared a post
              </span>
            </div>
          )}
    
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex gap-2.5">
              {/* Avatar */}
              <div className="relative">
                <img
                src={originalPost?.user?.photo}
                alt="user"
                className="
                            w-11 h-11
                            rounded-full
                            object-cover
                            border border-border
                        "
                />
                <span
                  className="
                            absolute bottom-3 right-0
                            w-2.5 h-2.5
                            rounded-full
                            bg-green-500
                            border-2 border-card
                        "
                />
              </div>
    
              {/* User Info */}
              <div className="space-y-0.5">
                <h2 className="text-sm text-foreground font-semibold leading-none">
                  {originalPost?.user?.name}
                </h2>
    
                <p className="text-xs text-muted-foreground">
                  @{originalPost?.user?.username}
                </p>
              <Link to={`/single-post/${post._id}`}>
                <span className="text-[11px] text-muted-foreground/70 hover:underline">
                  {new Date(originalPost?.createdAt).toLocaleString()}
                </span>
              </Link>
              </div>
            </div>
    
            {/* More */}
            {isOwner&&(

            
              <DropdownMenu>
        <DropdownMenuTrigger asChild>
              <button
                className="
                 cursor-pointer
                          flex items-center justify-center
                          w-8 h-8
                          rounded-xl
                          text-muted-foreground
                          hover:bg-accent
                          hover:text-primary
                          active:scale-95
                          transition-all duration-200
                        "
              >
                <MoreHorizontal size={18} />
              </button>
        
        </DropdownMenuTrigger>
        <DropdownMenuContent  align="end"
  className="
    w-40 p-2 rounded-2xl
    bg-card/95 backdrop-blur-xl
    border border-border
    shadow-2xl
  ">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={onEdit} className="
        group flex items-center gap-2
        px-3 py-2 rounded-xl
        cursor-pointer transition
        text-muted-foreground
        hover:bg-accent hover:text-accent-foreground
        focus:bg-accent focus:text-accent-foreground
      ">
              <PencilIcon className="w-4 h-4 stroke-muted-foreground group-hover:stroke-accent-foreground transition"/>
              Edit
            </DropdownMenuItem>
            
          </DropdownMenuGroup>
          <DropdownMenuSeparator  className="bg-border my-1"/>
          <DropdownMenuGroup>
            <DropdownMenuItem 
            onClick={onDelete}
                  disabled={isDeleting}
            className="
        group flex items-center gap-2
        px-3 py-2 rounded-xl
        cursor-pointer transition
        text-red-400
        hover:bg-red-500/10 hover:text-red-300
        focus:bg-red-500/10 focus:text-red-300
      " >
              <TrashIcon  className="w-4 h-4 stroke-red-400 group-hover:stroke-red-300 transition"/>
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      )}
          </div>
  </div>;
}

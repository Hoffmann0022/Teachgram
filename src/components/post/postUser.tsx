import { useState } from "react"
import type { Post } from "../../types/post"
import { useNavigate } from "react-router-dom"

export function PostUser({ post }: { post: Post }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate();

  return (
    <div
      className="relative aspect-square overflow-hidden rounded-sm cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate("/feed")}
    >
      {post.photoLink ? (
        <img
          src={post.photoLink}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
          Sem imagem
        </div>
      )}

      {hovered && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 text-white text-sm font-semibold transition-opacity">
          <span><i className="bi bi-heart-fill"></i> {post.likes}</span>
        </div>
      )}

      {post.isPrivate && (
        <div className="absolute top-2 right-2 rounded-full p-1">
          <i className="bi bi-lock-fill text-gray-500 text-[14px]"></i>
        </div>
      )}
    </div>
  )
}
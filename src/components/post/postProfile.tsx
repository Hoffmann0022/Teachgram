import { useState } from "react"
import type { Post } from "../../types/post"

export function PostItem({ post }: { post: Post }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative aspect-square overflow-hidden rounded-sm cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
          <span>❤️ {post.likes}</span>
        </div>
      )}

      {post.isPrivate && (
        <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
          <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
            <path d="M12 1a5 5 0 0 0-5 5v3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2h-2V6a5 5 0 0 0-5-5zm0 2a3 3 0 0 1 3 3v3H9V6a3 3 0 0 1 3-3z"/>
          </svg>
        </div>
      )}
    </div>
  )
}
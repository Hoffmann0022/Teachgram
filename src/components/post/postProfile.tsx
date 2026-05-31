import { useState } from "react"
import type { Post } from "../../types/post"
import api from "../../services/api"
import DeletePostModal from "../modals/deletePostModal"

interface PostProfileProps {
  post: Post
  onDeleted: (postId: number) => void  
}

export function PostProfile({ post, onDeleted }: PostProfileProps) {
  const [hovered, setHovered] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${post.id}`) 
      onDeleted(post.id)                      
      setShowModal(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div
      className="relative aspect-square overflow-hidden rounded-sm cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute top-1 right-1 z-10">
        <button
          onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v) }}
          className="text-white drop-shadow p-1 cursor-pointer"
        >
          <i className="bi bi-three-dots-vertical text-lg" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-8 bg-white border border-gray-100 rounded-xl shadow-lg w-36 py-1 cursor-pointer">
            <button
              onClick={(e) => { e.stopPropagation(); setShowModal(true); setMenuOpen(false) }}
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-50 transition cursor-pointer"
            >
              Excluir
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <DeletePostModal
          onClose={() => setShowModal(false)}
          onConfirm={handleDelete}
        />
      )}
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
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 text-white text-sm font-semibold">
          <span><i className="bi bi-heart-fill" /> {post.likes}</span>
        </div>
      )}

      {post.isPrivate && (
        <div className="absolute top-2 right-2 rounded-full p-1">
          <i className="bi bi-lock-fill text-white text-[14px]" />
        </div>
      )}
    </div>
  )
}
import { useState } from "react"

export interface FeedPost {
    id: number
    title: string
    description: string
    photoLink: string
    likes: number
    isPrivate: boolean
    createdAt: string
    userId: number
    userName: string
    userProfileLink?: string
}

function timeAgo(dateStr: string): string {
    const date = new Date(dateStr)
    const diff = Math.floor((Date.now() - date.getTime()) / 1000)
    if (diff < 60) return "agora mesmo"
    if (diff < 3600) return `há ${Math.floor(diff / 60)} min`
    if (diff < 86400) return `há ${Math.floor(diff / 3600)} h`
    return `há ${Math.floor(diff / 86400)} dias`
}

export default function PostFeed({
    post,
    onLike,
    onNavigate,
}: {
    post: FeedPost
    onLike: (id: number) => void
    onNavigate: (userId: number) => void
}) {
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(post.likes)
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLike = () => {
        setLiked(true)
        setLikes((l) => l + 1)
        onLike(post.id)
        setTimeout(() => setLiked(false), 800)
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">

            <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <button
                    onClick={() => onNavigate(post.userId)}
                    className="flex items-center gap-3 hover:opacity-80 transition"
                >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-linear-to-br from-[#F37671] to-[#f5a623] shrink-0 flex items-center justify-center text-white font-bold">
                        {post.userProfileLink ? (
                            <img
                                src={post.userProfileLink}
                                alt={post.userName}
                                className="w-full h-full object-cover"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                            />
                        ) : (
                            post.userName?.charAt(0).toUpperCase()
                        )}
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-semibold text-gray-800">@{post.userName}</p>
                        <p className="text-xs text-gray-400">{timeAgo(post.createdAt)}</p>
                    </div>
                </button>

                <div className="relative">
                    <button
                        onClick={() => setMenuOpen((v) => !v)}
                        className="text-gray-400 hover:text-gray-600 transition p-1 cursor-pointer"
                    >
                        <i className="bi bi-three-dots-vertical text-lg" />
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 top-8 bg-white border border-gray-100 rounded-xl shadow-lg z-10 w-36 py-1 cursor-pointer">
                            <button
                                onClick={() => { onNavigate(post.userId); setMenuOpen(false) }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition cursor-pointer"
                            >
                                Ver perfil
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {post.description && (
                <p className="px-4 pb-2 text-sm text-gray-700">{post.description}</p>
            )}

            {post.photoLink && (
                <div className="w-full bg-gray-100">
                    <img
                        src={post.photoLink}
                        alt={post.title}
                        className="w-full max-h-96 object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                    />
                </div>
            )}

            <div className="flex items-center gap-2 px-4 py-3">
                <button
                    onClick={handleLike}
                    className="transition-transform active:scale-125"
                >
                    <i className={`bi text-xl transition-colors ${liked ? "bi-heart-fill text-[#F37671]" : "bi-heart text-gray-400 hover:text-[#F37671]"}`} />
                </button>
                <span className="text-sm text-gray-500 font-medium">{likes} curtidas</span>
            </div>
        </div>
    )
}
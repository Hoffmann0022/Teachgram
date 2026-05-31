import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../services/api"
import type { User } from "../types/user"
import type { Post } from "../types/post"
import { Sidebar } from "../components/navbars/navbar"
import { BottomNav } from "../components/navbars/bottomNav"
import { PostUser } from "../components/post/postUser"

export default function UserProfile() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const currentUserId = Number(localStorage.getItem("userId"))

  const [user, setUser] = useState<User | null>(null)
  const [me, setMe] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [friendsCount, setFriendsCount] = useState(0)
  const [isFriend, setIsFriend] = useState(false)
  const [loading, setLoading] = useState(true)
  const [friendLoading, setFriendLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!localStorage.getItem("token")) { navigate("/login"); return }
    if (!id) return

    const fetchData = async () => {
      try {
        const [userRes, postsRes, myFriendsRes, meRes] = await Promise.all([
          api.get<User>(`/users/${id}`),
          api.get<Post[]>(`/posts/user/${id}`),
          api.get<User[]>(`/users/${currentUserId}/friends`),
          api.get<User>(`/users/${currentUserId}`),
        ])

        setUser(userRes.data)
        setMe(meRes.data)
        setPosts(postsRes.data.filter((p) => !p.isPrivate))
        setFriendsCount(
          (await api.get<User[]>(`/users/${id}/friends`)).data.length
        )
        setIsFriend(myFriendsRes.data.some((f) => f.id === Number(id)))
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleToggleFriend = async () => {
    setFriendLoading(true)
    try {
      if (isFriend) {
        await api.delete(`/users/${currentUserId}/friends/${id}`)
        setIsFriend(false)
        setFriendsCount((c) => c - 1)
      } else {
        await api.post(`/users/${currentUserId}/friends/${id}`)
        setIsFriend(true)
        setFriendsCount((c) => c + 1)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setFriendLoading(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#F37671] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
      <p className="text-red-400 text-sm">{error}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">

      <div className="hidden lg:flex">
        <Sidebar user={me} />
      </div>

      <BottomNav user={me} />

      <main className="flex-1 p-6 lg:p-10 pt-20 pb-24 lg:pt-10 lg:pb-10">

        <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-10">

          <div className="shrink-0 mx-auto sm:mx-0">
            <div className="w-32 h-32 lg:w-44 lg:h-44 rounded-full overflow-hidden border-4 border-white shadow-md">
              {user?.profileLink ? (
                <img
                  src={user.profileLink}
                  alt={user.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none"
                  }}
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-[#F37671] to-[#f5a623] flex items-center justify-center text-white text-4xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left pt-2">

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                {user?.bio && (
                  <p className="text-gray-400 text-sm mt-1">{user.bio}</p>
                )}
                {user?.mail && (
                  <p className="text-gray-300 text-xs mt-0.5">{user.mail}</p>
                )}
              </div>

              <div className="text-gray-300">
                <i className="bi bi-gear text-xl" />
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={handleToggleFriend}
                disabled={friendLoading}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-60 ${
                  isFriend
                    ? "border border-gray-300 text-gray-600 hover:bg-gray-50 flex items-center gap-1 cursor-pointer"
                    : "bg-[#F37671] text-white hover:opacity-90 cursor-pointer"
                }`}
              >
                {friendLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin " />
                    Aguarde...
                  </span>
                ) : isFriend ? (
                  <>Amigos <i className="bi bi-check text-base " /></>
                ) : (
                  "Adicionar"
                )}
              </button>
            </div>

            <div className="flex items-center gap-8 mt-6">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">{posts.length}</p>
                <p className="text-xs text-gray-400 mt-0.5">Posts</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">{friendsCount}</p>
                <p className="text-xs text-gray-400 mt-0.5">Amigos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mb-6" />

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300">
            <i className="bi bi-image text-4xl mb-3" />
            <p className="text-sm">Nenhum post público ainda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1">
            {posts.map((post) => (
              <PostUser key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
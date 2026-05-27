import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../services/api"
import type { User } from "../types/user"
import { Sidebar } from "../components/navbars/navbar"
import type { Post } from "../types/post"
import { PostItem } from "../components/post/postProfile"

export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }

    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId")
        if (!userId) {
          navigate("/login")
          return
        }

        const [userRes, postsRes] = await Promise.all([
          api.get<User>(`/users/${userId}`),
          api.get<Post[]>(`/posts/user/${userId}`),
        ])

        setUser(userRes.data)
        setPosts(postsRes.data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#F37671] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  const activePosts = posts.filter((p) => !p.isPrivate || true) 

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">
      <Sidebar user={user} />

      <main className="flex-1 p-10">

        <div className="flex items-start gap-10 mb-10">

          <div className="shrink-0">
            <div className="w-50 h-50 rounded-full overflow-hidden border-4 border-white shadow-md">
              {user?.profileLink ? (
                <img
                  src={user.profileLink}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-[#F37671] to-[#f5a623] flex items-center justify-center text-white text-4xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 pt-2">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {user?.name}
            </h1>

            {user?.bio && (
              <p className="text-gray-500 text-sm mb-1">{user.bio}</p>
            )}

            <p className="text-gray-400 text-sm mb-6">
              {user?.mail}
            </p>

            <div className="flex items-center gap-8 mb-6">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">{activePosts.length}</p>
                <p className="text-xs text-gray-400 mt-0.5">Posts</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">0</p>
                <p className="text-xs text-gray-400 mt-0.5">Amigos</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                to="/configuracoes"
                className="px-5 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                Editar perfil
              </Link>
              <Link
                to="/criar"
                className="px-5 py-2 rounded-lg bg-[#F37671] text-white text-sm font-medium hover:opacity-90 transition"
              >
                + Novo post
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mb-6" />

        {activePosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <i className="bi bi-plus-square text-2xl"></i>
            </div>
            <p className="text-sm font-medium">Nenhum post ainda</p>
            <p className="text-xs mt-1">Crie seu primeiro post!</p>
            <Link
              to="/criar"
              className="mt-4 px-5 py-2 rounded-lg bg-[#F37671] text-white text-sm font-medium hover:opacity-90 transition"
            >
              Criar post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1">
            {activePosts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
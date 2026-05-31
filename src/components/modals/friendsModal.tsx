import { useEffect, useState } from "react"
import api from "../../services/api"
import type { User } from "../../types/user"
import { useNavigate } from "react-router-dom"

interface FriendsModalProps {
  onClose: () => void
}

const ITEMS_PER_PAGE = 4

export default function FriendsModal({ onClose }: FriendsModalProps) {
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [friends, setFriends] = useState<number[]>([]) 
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [tab, setTab] = useState<"amigos" | "todos">("amigos")
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const navigate = useNavigate()

  const currentUserId = Number(localStorage.getItem("userId"))

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [usersRes, friendsRes] = await Promise.all([
          api.get<User[]>("/users"),
          api.get<User[]>(`/users/${currentUserId}/friends`).catch(() => ({ data: [] })),
        ])

        const others = usersRes.data.filter((u) => u.id !== currentUserId)
        setAllUsers(others)
        setFriends(friendsRes.data.map((f: User) => f.id))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const isFriend = (id: number) => friends.includes(id)

  const handleAddFriend = async (userId: number) => {
    setActionLoading(userId)
    try {
      await api.post(`/users/${currentUserId}/friends/${userId}`)
      setFriends((prev) => [...prev, userId])
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading(null)
    }
  }

  const handleRemoveFriend = async (userId: number) => {
    setActionLoading(userId)
    try {
      await api.delete(`/users/${currentUserId}/friends/${userId}`)
      setFriends((prev) => prev.filter((id) => id !== userId))
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading(null)
    }
  }

  const filtered = tab === "amigos"
    ? allUsers.filter((u) => isFriend(u.id))
    : allUsers.filter((u) => !isFriend(u.id))

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handleTab = (t: "amigos" | "todos") => {
    setTab(t)
    setPage(1)
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Amigos</h2>
          <button
            onClick={onClose}
            className="text-[#F37671] transition text-3xl leading-none cursor-pointer"
          >
            <i className="bi bi-x"></i>
          </button>
        </div>

        <div className="border-b border-gray-100 mb-4" />

        <div className="flex gap-2 mb-5">
          <button
            onClick={() => handleTab("amigos")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              tab === "amigos"
                ? "bg-[#F37671] text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            Meus amigos
          </button>
          <button
            onClick={() => handleTab("todos")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              tab === "todos"
                ? "bg-[#F37671] text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            Adicionar amigos
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-7 h-7 border-2 border-[#F37671] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-sm">
            {tab === "amigos" ? "Você ainda não tem amigos." : "Nenhum usuário encontrado."}
          </div>
        ) : (
          <ul className="flex flex-col gap-3 min-h-55">
            {paginated.map((user) => (
              <li key={user.id} className="flex items-center gap-3 cursor-pointer">

                <div className="w-12 h-12 rounded-full overflow-hidden bg-linear-to-br from-[#F37671] to-[#f5a623] shrink-0 flex items-center justify-center text-white font-bold text-lg" onClick={() => { navigate(`/usuario/${user.id}`); onClose() }}>
                  {user.profileLink ? (
                    <img
                      src={user.profileLink}
                      alt={user.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none"
                      }}
                    />
                  ) : (
                    user.name?.charAt(0).toUpperCase()
                  )}
                </div>

                <div className="flex-1 min-w-0" onClick={() => { navigate(`/usuario/${user.id}`); onClose() }}>
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {user.userName}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{user.name}</p>
                </div>

                {isFriend(user.id) ? (
                  <button
                    onClick={() => handleRemoveFriend(user.id)}
                    disabled={actionLoading === user.id}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-500 hover:bg-gray-50 hover:border-red-300 hover:text-red-400 transition disabled:opacity-50 cursor-pointer"
                  >
                    {actionLoading === user.id ? "..." : "Remover"}
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddFriend(user.id)}
                    disabled={actionLoading === user.id}
                    className="px-3 py-1.5 rounded-lg bg-[#F37671] text-white text-xs font-medium hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
                  >
                    {actionLoading === user.id ? "..." : "Adicionar"}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 rounded-lg border border-[#F37671] flex items-center justify-center text-[#F37671] disabled:opacity-30 transition cursor-pointer"
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition cursor-pointer ${
                  p === page
                    ? "bg-[#F37671] text-white"
                    : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 rounded-lg border border-[#F37671] flex items-center justify-center text-[#F37671] disabled:opacity-30 transition cursor-pointer"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
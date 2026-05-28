import { Link, useNavigate } from "react-router-dom"
import type { User } from "../../types/user"
import logo from "../../assets/img/logo.png"

export function Sidebar({ user }: { user: User | null }) {
  const navigate = useNavigate()

  const navItems = [
    { icon: <i className="bi bi-house-door text-2xl"></i>, label: "Feed", to: "/feed" },
    { icon: <i className="bi bi-people text-2xl"></i>, label: "Amigos", to: "/amigos" },
    { icon: <div></div>, label: "Perfil", to: "/perfil", active: true },
    { icon: <i className="bi bi-gear text-2xl"></i>, label: "Configurações", to: "/configuracoes" },
    { icon: <i className="bi bi-plus-square text-2xl"></i>, label: "Criar", to: "/criar" },
  ]

  return (
    <aside className="min-h-screen mr-10 border-r border-gray-100 flex flex-col py-6 px-4 shrink-0">
      <div className="flex items-center gap-2 mb-10 px-2">
        <button onClick={() => navigate(-1)} className="text-[#F37671] cursor-pointer mr-4 hover:opacity-70 transition">
          <i className="bi bi-arrow-left text-3xl"></i>
        </button>
        <img src={logo} className="w-50" alt="Teachgram Logo" />
      </div>

      <nav className="flex flex-col my-20 gap-7 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`flex items-center gap-3 px-5 py-6 rounded-xl border border-gray-300  text-sm font-medium transition-all
              ${item.active
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
          >
            {item.label === "Perfil" && user?.profileLink ? (
              <img
                src={user.profileLink}
                alt="avatar"
                className="w-7 h-7 rounded-full object-cover"
              />
            ) : (
              item.icon
            )}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

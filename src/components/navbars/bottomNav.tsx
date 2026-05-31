import { Link, useLocation, useNavigate } from "react-router-dom"
import type { User } from "../../types/user"
import logo from "../../assets/img/logo.png"
import { useState } from "react"
import CreatePostModal from "../modals/createPostModal"
import FriendsModal from "../modals/friendsModal"

export function BottomNav({ user }: { user: User | null }) {
  const location = useLocation()
  const navigate = useNavigate()
  const current = location.hash.replace("#", "") || "/"
  const [showModal, setShowModal] = useState(false)
  const [showFriends, setShowFriends] = useState(false)

  const navItems = [
    {
      icon: <i className="bi bi-house-door text-2xl" />,
      iconActive: <i className="bi bi-house-door-fill text-2xl" />,
      to: "/feed",
    },
    {
      icon: <i className="bi bi-people text-2xl" />,
      iconActive: <i className="bi bi-people-fill text-2xl" />,
      to: "#",
      onClick: () => setShowFriends(true)
    },
    {
      icon: <i className="bi bi-plus-square text-2xl" />,
      iconActive: <i className="bi bi-plus-square text-2xl" />,
      to: "#",
      onClick: () => setShowModal(true)
    },
    {
      icon: <i className="bi bi-gear text-2xl" />,
      iconActive: <i className="bi bi-gear-fill text-2xl" />,
      to: "/configuracoes",
    },
    {
      icon: user?.profileLink ? (
        <img src={user.profileLink} alt="avatar" className="w-8 h-8 rounded-full object-cover border-2 border-transparent" />
      ) : (
        <i className="bi bi-person-circle text-2xl" />
      ),
      iconActive: user?.profileLink ? (
        <img src={user.profileLink} alt="avatar" className="w-8 h-8 rounded-full object-cover border-2 border-[#F37671]" />
      ) : (
        <i className="bi bi-person-circle text-2xl text-[#F37671]" />
      ),
      to: "/perfil",
    },
  ]

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 px-4 py-3 flex items-center">
        <img src={logo} className="h-8" alt="Teachgram Logo" />
      </header>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 px-2">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = current === item.to || current.startsWith(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={item.onClick}
                className={`flex flex-col items-center justify-center px-4 transition-all
                  ${isActive ? "text-[#F37671]" : "text-gray-400 hover:text-gray-600"}`}
              >
                {isActive ? item.iconActive : item.icon}
              </Link>
            )
          })}
        </div>
        {showModal && (
          <CreatePostModal
            onClose={() => setShowModal(false)}
            onSuccess={() => {
              navigate("/perfil")
              window.location.reload()
            }}
          />)}

        {showFriends &&
          <FriendsModal onClose={() => setShowFriends(false)} />
        }
      </nav>
    </>
  )
}
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import type { User } from "../types/user"
import { Sidebar } from "../components/navbars/navbar"
import { BottomNav } from "../components/navbars/bottomNav"
import details from "../assets/img/details.png"
import CreatePostModal from "../components/modals/createPostModal"
import { type FeedPost } from "../components/post/postFeed"
import PostFeed from "../components/post/postFeed"

export default function Feed() {
    const navigate = useNavigate()
    const currentUserId = Number(localStorage.getItem("userId"))

    const [me, setMe] = useState<User | null>(null)
    const [posts, setPosts] = useState<FeedPost[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)

    const fetchFeed = async () => {
        try {
            const [meRes, usersRes] = await Promise.all([
                api.get<User>(`/users/${currentUserId}`),
                api.get<User[]>("/users"),
            ])

            setMe(meRes.data)


            const allPostsPromises = usersRes.data.map((u) =>
                api.get<FeedPost[]>(`/posts/user/${u.id}`)
                    .then((res) => res.data
                        .filter((p) => !p.isPrivate || u.id === currentUserId)
                        .map((p) => ({
                            ...p,
                            userName: u.userName,
                            userProfileLink: u.profileLink,
                        }))
                    )
                    .catch(() => [])
            )

            const allPosts = (await Promise.all(allPostsPromises)).flat()

            allPosts.sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )

            setPosts(allPosts)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!localStorage.getItem("token")) { navigate("/login"); return }
        fetchFeed()
    }, [])

    const handleLike = async (postId: number) => {
        try {
            await api.post(`/posts/${postId}/like`)
        } catch (err) {
            console.error(err)
        }
    }

    const handleNavigate = (userId: number) => {
        if (userId === currentUserId) navigate("/perfil")
        else navigate(`/usuario/${userId}`)
    }

    return (
        <div className="min-h-screen bg-[#f5f5f5] flex">

            <div className="hidden lg:flex">
                <Sidebar user={me} />
            </div>

            <BottomNav user={me} />

            <main className="flex-1 flex pt-20 pb-24 lg:pt-8 lg:pb-8 px-4 lg:px-10 gap-8 max-w-5xl w-full">

                <section className="flex-1 max-w-xl w-full mx-auto">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-8 h-8 border-2 border-[#F37671] border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-300">
                            <i className="bi bi-images text-5xl mb-4" />
                            <p className="text-sm">Nenhum post ainda.</p>
                            <button
                                onClick={() => setShowModal(true)}
                                className="mt-4 px-5 py-2 rounded-lg bg-[#F37671] text-white text-sm font-medium hover:opacity-90 transition"
                            >
                                Criar primeiro post
                            </button>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <PostFeed
                                key={post.id}
                                post={post}
                                onLike={handleLike}
                                onNavigate={handleNavigate}
                            />
                        ))
                    )}
                </section>

                <aside className={`hidden xl:flex flex-col gap-0 shrink-0 pt-4 opacity-60 w-60 h-screen fixed top-0 right-0`}
                    style={{
                        backgroundImage: `url(${details})`,
                        backgroundRepeat: "repeat-y",
                        backgroundSize: "contain",
                    }}>
                </aside>
            </main>

            {showModal && (
                <CreatePostModal
                    onClose={() => setShowModal(false)}
                    onSuccess={fetchFeed}
                />
            )}
        </div>
    )
}
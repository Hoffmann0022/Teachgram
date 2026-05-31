import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import type { updateProfileRequest } from "../types/user"

import { authService } from "../services/authService"
import api from "../services/api"

import Loading from "./Loading"

import details from "../assets/img/details.png"

export default function EditProfile() {
    const navigate = useNavigate()
    const [updateLoading, setUpdateLoading] = useState(false)
    const [error, setError] = useState("")
    const [user, setUser] = useState<updateProfileRequest | null>(null)
    const [form, setForm] = useState({
        userName: "",
        bio: "",
        profileLink: "",
    })

    const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, [k]: e.target.value }))

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setUpdateLoading(true)
        try {
            const userId = localStorage.getItem("userId")
            await authService.update(Number(userId), form)
            navigate("/perfil")
        } catch (err: any) {
            setError(err.message)
        } finally {
            setUpdateLoading(false)
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem("userId")
            if (!userId) return

            const res = await api.get(`/users/${userId}`)
            setUser(res.data)
        }

        fetchUser()
    }, [])

    useEffect(() => {
        if (user) {
            setForm({
                userName: user.userName || "",
                bio: user.bio || "",
                profileLink: user.profileLink || "",
            })
        }
    }, [user])

    return (
        <>
            <main className="flex-1 p-6 lg:p-10 pt-20 pb-24 lg:pt-10 lg:pb-10">
                <div className="flex items-center gap-2 mb-10 px-2">
                    <button onClick={() => navigate(-1)} className="text-[#F37671] cursor-pointer mr-4 hover:opacity-70 transition">
                        <i className="bi bi-arrow-left text-3xl"></i>
                    </button>
                </div>

                <div className="lg:ml-20 flex flex-col gap-10">
                    <h1 className="text-xl font-bold text-gray-900">Configurações da conta</h1>

                    <div className="shrink-0">
                        <div className="w-30 h-30 sm:w-50 sm:h-50 rounded-full overflow-hidden border-4 border-white shadow-md">
                            {user?.profileLink ? (
                                <img
                                    src={user.profileLink}
                                    alt={user.userName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-linear-to-br from-[#F37671] to-[#f5a623] flex items-center justify-center text-white text-4xl font-bold">
                                    {user?.userName?.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                    </div>

                    <form onSubmit={handleUpdate} className="flex flex-col gap-5 lg:w-1/3">

                        <div className="flex flex-col gap-2">
                            <label className="text-xl text-black">Foto de perfil</label>
                            <input
                                type="text"
                                placeholder="Link da foto de perfil"
                                value={form.profileLink}
                                onChange={set("profileLink")}
                                className="h-12 px-4 border-b border-gray-300 outline-none focus:border-[#F37671] transition text-gray-600"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xl text-black">Nome do usuário</label>
                            <input
                                type="text"
                                placeholder="@ seu_username"
                                value={form.userName}
                                onChange={set("userName")}
                                className="h-12 px-4 border-b border-gray-300 outline-none focus:border-[#F37671] transition text-gray-600"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xl text-black">Descrição</label>
                            <input
                                type="text"
                                placeholder="Faça uma descrição"
                                value={form.bio}
                                onChange={set("bio")}
                                className="h-12 px-4 border-b border-gray-300 outline-none focus:border-[#F37671] transition text-gray-600"
                            />
                        </div>

                        <div className="flex w-full gap-20 justify-between items-center my-5">
                            <button
                                onClick={() => navigate(-1)}
                                className="border border-[#F37671] text-[#F37671] text-sm py-2 rounded-lg w-full cursor-pointer"
                            >
                                <p>Cancelar</p>
                            </button>

                            <button
                                type="submit"
                                className="bg-[#F37671] text-sm text-white py-2 rounded-lg w-full cursor-pointer"
                            >
                                Atualizar
                            </button>
                        </div>

                    </form>
                </div>

                {error && (
                    <p className="text-sm text-red-400 mt-2">{error}</p>
                )}

                <aside className={`hidden xl:flex flex-col gap-0 shrink-0 pt-4 opacity-60 w-60 h-screen fixed top-0 right-0`}
                    style={{
                        backgroundImage: `url(${details})`,
                        backgroundRepeat: "repeat-y",
                        backgroundSize: "contain",
                    }}>
                </aside>
            </main>
            {updateLoading ? <Loading /> : ""}
        </>
    )
}
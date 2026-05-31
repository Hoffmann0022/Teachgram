import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import type { updateAccountRequest } from "../types/user";

import Loading from "./Loading";
import details from "../assets/img/details.png"
import api from "../services/api";
import { authService } from "../services/authService";

export default function ConfigAccount() {
    const navigate = useNavigate()
    const [updateLoading, setUpdateLoading] = useState(false)
    const [error, setError] = useState("")
    const [user, setUser] = useState<updateAccountRequest | null>(null)
    const [form, setForm] = useState({
        name: "",
        mail: "",
        phone: "",
        password: "",
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
                name: user.name || "",
                mail: user.mail || "",
                phone: user.phone || "",
                password: "",
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

                    <form onSubmit={handleUpdate} className="flex flex-col gap-5 lg:w-1/3">

                        <div className="flex flex-col gap-2">
                            <label className="text-xl text-black">Nome</label>
                            <input
                                type="text"
                                placeholder="Digite seu nome"
                                value={form.name}
                                onChange={set("name")}
                                className="h-12 px-4 border-b border-gray-300 outline-none focus:border-[#F37671] transition text-gray-600" 
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xl text-black">E-mail</label>
                            <input
                                type="email"
                                placeholder="Digite seu E-mail"
                                value={form.mail}
                                onChange={set("mail")}
                                className="h-12 px-4 border-b border-gray-300 outline-none focus:border-[#F37671] transition text-gray-600"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xl text-black">Celular</label>
                            <input
                                type="tel"
                                placeholder="Digite seu número de celular"
                                value={form.phone}
                                onChange={set("phone")}
                                className="h-12 px-4 border-b border-gray-300 outline-none focus:border-[#F37671] transition text-gray-600"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xl text-black">Senha</label>
                            <input
                                type="password"
                                placeholder="Digite sua senha"
                                value={form.password}
                                onChange={set("password")}
                                className="h-12 px-4 border-b border-gray-300 outline-none focus:border-[#F37671] transition text-gray-600"
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-4 rounded-xl w-fit px-5 py-3 bg-[#F37671] text-white text-sm font-semibold shadow-md hover:opacity-90 transition cursor-pointer disabled:opacity-60"
                        >
                            Salvar
                        </button>
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
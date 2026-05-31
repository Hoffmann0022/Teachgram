import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";

import details from "../assets/img/details.png"
import DeleteUserModal from "../components/modals/deleteUserModal";

import api from "../services/api";
import Loading from "./Loading";

export default function Settings() {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [error, setError] = useState("")

    const handleDelete = async () => {
        setDeleteLoading(true)
        setError("")
        try {
            const userId = localStorage.getItem("userId")
            await api.delete(`/users/${userId}`)
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
            navigate("/login")
        } catch (err: any) {
            setError(err.message)
            setDeleteLoading(false)
        }
    }

    return (
        <>
            <main className="flex-1 p-6 lg:p-10 pt-20 pb-24 lg:pt-10 lg:pb-10">
                <div className="flex items-center gap-2 mb-10 px-2">
                    <button onClick={() => navigate(-1)} className="text-[#F37671] cursor-pointer mr-4 hover:opacity-70 transition">
                        <i className="bi bi-arrow-left text-3xl"></i>
                    </button>
                </div>

                <div className="ml-10 flex flex-col gap-10">
                    <Link to="/configuracoes_da_conta" className="flex items-center gap-10">
                        <p className="text-xl font-bold text-gray-900">Configurações da conta</p>
                        <i className="bi bi-chevron-right text-[#F37671]"></i>
                    </Link>
                    <Link to="/editar_perfil" className="flex items-center gap-10">
                        <p className="text-xl font-bold text-gray-900">Editar perfil</p>
                        <i className="bi bi-chevron-right text-[#F37671]"></i>
                    </Link>
                    <button onClick={() => setShowModal(true)} className="flex items-center gap-10 cursor-pointer">
                        <p className="text-xl text-[#F37671] underline">Excluir perfil</p>
                    </button>
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
                {
                    showModal && (
                        <DeleteUserModal
                            onClose={() => setShowModal(false)}
                            onConfirm={handleDelete}
                        />
                    )
                }
            </main>
            {deleteLoading ? <Loading /> : ""}
        </>
    )
}
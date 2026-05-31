interface DeleteModalProps {
    onClose: () => void
    onConfirm: () => void
}

export default function DeleteUserModal({ onClose, onConfirm }: DeleteModalProps) {
    return (

        <div
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Excluir</h2>
                </div>
                <div className="border-b border-gray-100 mb-4" />

                <p>Todos os seus dados serão excluídos.</p>

                <div className="flex w-full gap-20 justify-between items-center my-5">
                    <button
                        onClick={onClose}
                        className="border border-[#F37671] text-[#F37671] text-sm py-2 rounded-lg w-full cursor-pointer"
                    >
                        <p>Cancelar</p>
                    </button>

                    <button
                        onClick={onConfirm}
                        className="bg-[#F37671] text-sm text-white py-2 rounded-lg w-full cursor-pointer"
                    >
                        <p>Confirmar</p>
                    </button>
                </div>

            </div>
        </div>


    )
}
import { useState } from "react"
import api from "../../services/api"

interface CreatePostModalProps {
  onClose: () => void
  onSuccess: () => void
}

interface PostForm {
  title: string
  description: string
  photoLink: string
  videoLink: string
  isPrivate: boolean
}

function StepUpload({
  preview,
  onImageUrl,
  onNext,
  onClose,
}: {
  preview: string
  onImageUrl: (url: string) => void
  onNext: () => void
  onClose: () => void
}) {
  const [urlInput, setUrlInput] = useState("")
  const [error, setError] = useState("")

  const handleUrl = () => {
    if (!urlInput.trim()) { setError("Insira uma URL válida."); return }
    onImageUrl(urlInput.trim())
    setError("")
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-800">Criar nova publicação</h2>
        <button onClick={onClose} className="text-[#F37671] transition text-xl leading-none cursor-pointer">×</button>
      </div>


      <div className="flex gap-2">
        <input
          type="text"
          placeholder="https://exemplo.com/foto.jpg"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          className="flex-1 h-10 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#F37671] transition"
        />
        <button
          onClick={handleUrl}
          className="px-4 h-10 rounded-lg bg-[#F37671] text-white text-sm font-medium hover:opacity-90 transition cursor-pointer"
        >
          OK
        </button>
      </div>

      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}

      {preview && (
        <button
          onClick={onNext}
          className="mt-5 w-full h-10 rounded-lg bg-[#F37671] text-white text-sm font-semibold hover:opacity-90 transition cursor-pointer"
        >
          Avançar →
        </button>
      )}
    </div>
  )
}

function StepPreview({
  preview,
  onNext,
  onBack,
}: {
  preview: string
  onNext: () => void
  onBack: () => void
  onClose: () => void
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-[#F37671] cursor-pointer">
            <i className="bi bi-arrow-left text-lg" />
          </button>
          <h2 className="text-base font-semibold text-gray-800">Criar nova publicação</h2>
        </div>
        <button
          onClick={onNext}
          className="text-sm font-semibold text-[#F37671] hover:opacity-70 transition cursor-pointer"
        >
          Avançar
        </button>
      </div>

      <div className="rounded-xl overflow-hidden bg-gray-100 mb-4">
        <img
          src={preview}
          alt="preview"
          className="w-full max-h-72 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=Imagem+inválida"
          }}
        />
      </div>

      <p className="text-xs text-gray-400 text-center">Sua foto ficou ótima! Clique em avançar para continuar.</p>
    </div>
  )
}

function StepDetails({
  form,
  preview,
  loading,
  error,
  onChange,
  onSubmit,
  onBack,
  onClose,
}: {
  form: PostForm
  preview: string
  loading: boolean
  error: string
  onChange: (k: keyof PostForm, v: string | boolean) => void
  onSubmit: () => void
  onBack: () => void
  onClose: () => void
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-[#F37671] cursor-pointer">
            <i className="bi bi-arrow-left text-lg" />
          </button>
          <h2 className="text-base font-semibold text-gray-800">Criar nova publicação</h2>
        </div>
        <button onClick={onClose} className="text-[#F37671] cursor-pointer transition text-xl leading-none">×</button>
      </div>

      <div className="flex gap-4">

        <div className="w-28 h-28 rounded-xl overflow-hidden bg-gray-100 shrink-0">
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/112x112?text=?"
            }}
          />
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <div>
            <input
              type="text"
              placeholder="Título *"
              maxLength={50}
              value={form.title}
              onChange={(e) => onChange("title", e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#F37671] transition"
            />
            <p className="text-right text-xs text-gray-300 mt-0.5">{form.title.length}/50</p>
          </div>

          <textarea
            placeholder="Escreva uma legenda..."
            maxLength={200}
            value={form.description}
            onChange={(e) => onChange("description", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#F37671] transition resize-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 px-1">
        <div>
          <p className="text-sm font-medium text-gray-700">Publicação privada</p>
          <p className="text-xs text-gray-400">Somente você poderá ver</p>
        </div>
        <button
          onClick={() => onChange("isPrivate", !form.isPrivate)}
          className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
            form.isPrivate ? "bg-[#F37671]" : "bg-gray-200"
          }`}
        >
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
            form.isPrivate ? "translate-x-5" : "translate-x-0"
          }`} />
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-400 mt-3 text-center">{error}</p>
      )}

      <button
        onClick={onSubmit}
        disabled={loading}
        className="mt-5 w-full h-10 rounded-lg bg-[#F37671] text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-60 cursor-pointer"
      >
        {loading ? "Publicando..." : "Publicar"}
      </button>
    </div>
  )
}

export default function CreatePostModal({ onClose, onSuccess }: CreatePostModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [preview, setPreview] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState<PostForm>({
    title: "",
    description: "",
    photoLink: "",
    videoLink: "",
    isPrivate: false,
  })

  const handleImageUrl = (url: string) => {
    setPreview(url)
    setForm((p) => ({ ...p, photoLink: url }))
  }

  const handleChange = (k: keyof PostForm, v: string | boolean) => {
    setForm((p) => ({ ...p, [k]: v }))
  }

  const handleSubmit = async () => {
    if (!form.title.trim()) { setError("O título é obrigatório."); return }
    setError("")
    setLoading(true)

    try {
      const userId = localStorage.getItem("userId")
      await api.post("/posts", {
        ...form,
        userId: Number(userId),
      })
      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-fade-in">
        {step === 1 && (
          <StepUpload
            preview={preview}
            onImageUrl={handleImageUrl}
            onNext={() => setStep(2)}
            onClose={onClose}
          />
        )}
        {step === 2 && (
          <StepPreview
            preview={preview}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
            onClose={onClose}
          />
        )}
        {step === 3 && (
          <StepDetails
            form={form}
            preview={preview}
            loading={loading}
            error={error}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onBack={() => setStep(2)}
            onClose={onClose}
          />
        )}

        <div className="flex justify-center gap-1.5 mt-5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step ? "w-6 bg-[#F37671]" : "w-1.5 bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
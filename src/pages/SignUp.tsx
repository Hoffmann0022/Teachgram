import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/img/logo.png"
import banner from "../assets/img/img_home.png"
import details from "../assets/img/details.png"
import { authService } from "../services/authService"
import Loading from "./Loading"

export default function SignUp() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    mail: "",
    userName: "",
    bio: "",
    phone: "",
    password: "",
    profileLink: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await authService.signup(form)
      navigate("/login")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex justify-between">

      <section className="w-full lg:w-1/2 my-20 flex items-center justify-center px-8">
        <main className="w-full max-w-md">

          <div className="flex items-center gap-4 mb-12">
            <img src={logo} alt="Teachgram Logo" />
          </div>

          <h3 className="text-3xl font-semibold text-[#333] mb-8">
            Crie sua conta
          </h3>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-500 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#333]">Nome</label>
              <input
                type="text"
                placeholder="Digite seu nome"
                value={form.name}
                onChange={set("name")}
                className="h-12 px-4 rounded-lg border border-gray-300 outline-none focus:border-[#F37671] transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#333]">E-mail</label>
              <input
                type="email"
                placeholder="Digite seu E-mail"
                value={form.mail}
                onChange={set("mail")}
                className="h-12 px-4 rounded-lg border border-gray-300 outline-none focus:border-[#F37671] transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#333]">Username</label>
              <input
                type="text"
                placeholder="@ seu_username"
                value={form.userName}
                onChange={set("userName")}
                className="h-12 px-4 rounded-lg border border-gray-300 outline-none focus:border-[#F37671] transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#333]">Descrição</label>
              <input
                type="text"
                placeholder="Faça uma descrição"
                value={form.bio}
                onChange={set("bio")}
                className="h-12 px-4 rounded-lg border border-gray-300 outline-none focus:border-[#F37671] transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#333]">Celular</label>
              <input
                type="tel"
                placeholder="Digite seu número de celular"
                value={form.phone}
                onChange={set("phone")}
                className="h-12 px-4 rounded-lg border border-gray-300 outline-none focus:border-[#F37671] transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#333]">Senha</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={form.password}
                onChange={set("password")}
                className="h-12 px-4 rounded-lg border border-gray-300 outline-none focus:border-[#F37671] transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#333]">Link</label>
              <input
                type="text"
                placeholder="Link da foto de perfil"
                value={form.profileLink}
                onChange={set("profileLink")}
                className="h-12 px-4 rounded-lg border border-gray-300 outline-none focus:border-[#F37671] transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 h-14 rounded-xl bg-[#F37671] text-white text-xl font-semibold shadow-md hover:opacity-90 transition cursor-pointer disabled:opacity-60"
            >
              {loading ? "Cadastrando..." : "Próximo"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-10">
            Já possui conta?{" "}
            <Link to="/login" className="text-[#F37671] font-semibold hover:underline">
              Entrar
            </Link>
          </p>
        </main>
      </section>

      <section className="hidden lg:flex relative overflow-hidden w-1/2">
        <img
          src={banner}
          alt=""
          className="w-full h-full"
        />
        <div className="absolute bottom-0 left-0 flex flex-col">
          <img src={details} alt="" />
          <img src={details} alt="" />
        </div>
      </section>
      {loading ? <Loading /> : ""}
    </div>
  )
}

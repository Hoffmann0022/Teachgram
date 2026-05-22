import logo from "../assets/img/logo.png"
import banner from "../assets/img/img_home.png"
import details from "../assets/img/details.png"

function Login() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">

      <section className="w-full lg:w-1/2 flex items-center justify-center px-8">
        <main className="w-full max-w-md">

          <div className="flex items-center gap-4 mb-12">
            <img src={logo} alt="Teachgram Logo" />
          </div>

          <h3 className="text-3xl font-semibold text-[#333] mb-8">
            Crie sua conta
          </h3>

          <form method="post" className="flex flex-col gap-5">

            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#333]">E-mail</label>

              <input
                type="email"
                name="email"
                placeholder="Digite seu E-mail"
                className="h-12 px-4 rounded-lg border border-gray-300 outline-none focus:border-[#F37671] transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#333]">Senha</label>

              <input
                type="password"
                name="password"
                placeholder="Digite sua senha"
                className="h-12 px-4 rounded-lg border border-gray-300 outline-none focus:border-[#F37671] transition"
              />
            </div>

            <button
              type="submit"
              className="mt-4 h-14 rounded-xl bg-[#F37671] text-white text-xl font-semibold shadow-md hover:opacity-90 transition cursor-pointer"
            >
              Próximo
            </button>
          </form>

          <p className="text-center text-gray-600 mt-10">
            Não possui conta?{" "}
            <a href="#" className="text-[#F37671] font-semibold hover:underline">
              Cadastre-se
            </a>
          </p>
        </main>
      </section>

      <section className="hidden lg:flex w-1/2 relative overflow-hidden">

        <img
          src={banner}
          alt=""
          className="w-full h-full object-cover rounded-tl-[180px]"
        />
        <div className="absolute bottom-0 left-0 flex flex-col">
          <img src={details} alt="" className="" />
          <img src={details} alt="" />
        </div>
      </section>
    </div>
  )
}

export default Login 
import logo from "../../public/logo_icon.png"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-[#F37671] flex flex-col items-center justify-center transition-opacity duration-300">
      <div className="flex flex-col items-center gap-6">
        <div className="w-28 h-28">
          <img src={logo} alt="Teachgram" className="w-full h-full object-contain" />
        </div>
        <p className="text-white text-lg font-medium tracking-wide">
          Carregando...
        </p>
      </div>
    </div>
  )
}
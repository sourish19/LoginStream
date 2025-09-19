import { useNavigate } from "react-router-dom"
import { Home, ArrowLeft } from "lucide-react"

const NotFound = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate("/")
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-black px-6 text-center text-white">
      <h1 className="mb-4 text-8xl font-extrabold tracking-tight text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.7)] sm:text-9xl">
        404
      </h1>
      <h2 className="mb-3 text-3xl font-bold text-neutral-200 sm:text-4xl md:text-5xl">
        Page Not Found
      </h2>
      <p className="mb-10 max-w-lg text-lg text-neutral-400 sm:text-xl">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={handleGoHome}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-lg font-medium shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black"
        >
          <Home size={20} />
          Go Home
        </button>

        <button
          onClick={handleGoBack}
          className="flex items-center justify-center gap-2 rounded-xl border border-neutral-600 px-6 py-3 text-lg font-medium transition-all hover:scale-105 hover:border-neutral-500 hover:bg-neutral-800/50 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-black"
        >
          <ArrowLeft size={20} />
          Go Back
        </button>
      </div>
    </div>
  )
}

export default NotFound

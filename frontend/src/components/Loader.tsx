export const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo con opacidad */}
      <div className="absolute inset-0 bg-zinc-900 opacity-80 blur-sm"></div>

      {/* Contenido encima */}
      <div className="relative flex flex-col items-center text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        <p className="mt-6 text-white text-lg font-semibold">
          Generando protocolo
          <br/>
          esto puede tomar un rato...
        </p>
      </div>
    </div>
  )
}



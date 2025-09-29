import type { FormEvent } from 'react'
import { useState } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { FaQuestionCircle } from 'react-icons/fa'
import { Loader } from './Loader'
import { showToast } from '../utils/showToast'
import { Modal } from './Modal'
import { createProtocol } from '../service/createProtocol'

export const IndividualForm = () => {
  const [nombre, setNombre] = useState('')
  const [temas, setTemas] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!nombre && !temas) {
      showToast('debes poner un nombre y los temas', 'warning')
    } else if (!nombre) {
      showToast('debes poner un nombre', 'warning')
    } else if (!temas) {
      showToast('debes poner al menos un tema', 'warning')
    } else {
      try {
        setLoading(true)
        await createProtocol(temas, nombre)
        showToast('Protocolo generado correctamente', 'success')
        setLoading(false)
      } catch (error: any) {
        setLoading(false)
        showToast('Error al generar protocolo, intentalo mas tarde', 'error')
        console.log(error)
        if (error) {
          console.log(error.response.data)
        }
      }
    }
  }

  const handleClear = () => {
    setTemas('')
    setNombre('')
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 w-3/4 sm:w-lg rounded-lg h-1/2 min-w-90 sm:h-130
    flex flex-col justify-center align-center items-center p-6 sm:px-12 shadow-black shadow-lg
    "
      >
        {loading && <Loader />}
        <h2 className="text-white text-2xl">Protocolo Individual</h2>
        <input
          type="text"
          id="nombre"
          placeholder="Nombre de la materia"
          name="nombre"
          autoComplete="off"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="bg-zinc-800 w-full p-3 text-white focus:outline-none rounded-sm
        mb-4 mt-10 focus:bg-zinc-700 transition-all duration-400 ease-in-out
      "
        />
        <textarea
          name=""
          id="temas"
          cols={30}
          rows={10}
          value={temas}
          onChange={(e) => setTemas(e.target.value)}
          className="bg-zinc-800 w-full p-3 text-white focus:outline-none resize-none
        rounded-sm scrollbar-hide mb-4 focus:bg-zinc-700 transition-all duration-400 ease-in-out
        "
          placeholder="Pega aquí los temas de la unidad..."
        ></textarea>
        <div className="flex flex-row h-11 w-full ">
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-2 rounded-sm w-full sm:w-86 mr-4
         hover:cursor-pointer hover:rounded-xl transition-all duration-200 ease-in-out
         border border-blue-600 active:duration-75 active:bg-zinc-900 focus:outline-none active:border-white
          "
          >
            Generar Protocolo
          </button>
          <button
            className="bg-blue-600 text-white rounded-xl w-14
        hover:cursor-pointer hover:rounded-3xl transition-all duration-200 ease-in-out
        active:duration-75
        active:bg-red-800 focus:outline-none border border-blue-600
        active:border active:border-white
        "
            onClick={handleClear}
            type="button"
          >
            <MdDeleteOutline size={20} className="mx-auto" />
          </button>
        </div>
        <div className="flex w-full pt-5 focus:outline-none">
          <button
            className="ml-auto focus:outline-none"
            type="button"
            onClick={() => setIsOpen(true)}
          >
            <FaQuestionCircle
              className="text-white text-lg hover:scale-125 focus:outline-none 
        transition-all duration-200 ease-in-out hover:cursor-pointer
        "
            />
          </button>
        </div>
      </form>
      <Modal isOpen={isOpen} title="info" onClose={() => setIsOpen(false)}>
        <p>
          Pega los temas de la unidad en el campo y se genera el protocolo en la
          plantilla :)
        </p>
      </Modal>
    </>
  )
}

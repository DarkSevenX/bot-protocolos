import { useNavigate } from '../context/RouterContext'
import { LuGithub } from 'react-icons/lu'

export const NavBar = () => {
  //const { navigate } = useNavigate()
  
  return (
    <nav
      className="w-full bg-zinc-900 text-white flex flex-row 
    justify-between px-4 sm:px-12 py-3 items-center shadow-black shadow-sm"
    >
      <div className="bg-zinc-800 rounded-full text-lg px-7 py-2">
        <h1>Protocol IA</h1>
      </div>
      <div className='flex flex-row items-center'>
        {/* <button */}
        {/*   className="border-b-2 border-zinc-900 hover:cursor-pointer hover:border-b-4 hover:border-blue-600  */}
        {/* transition-all duration-150 ease-in focus:outline-none" */}
        {/*   onClick={() => navigate('individual')} */}
        {/* > */}
        {/*   Individual */}
        {/* </button> */}
        <button
          className="bg-blue-600 rounded-full text-lg px-8 py-2 ml-8
        hover:cursor-pointer hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center gap-2
        focus:outline-none
        "
          onClick={() => window.open('https://github.com/DarkSevenX', '_blank')}
        >
          <p className='hidden sm:block'>Github</p><LuGithub size={20}  />
        </button>
      </div>
    </nav>
  )
}

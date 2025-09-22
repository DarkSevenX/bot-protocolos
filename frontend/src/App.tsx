import { NavBar } from './components/NavBar'
import { Router } from './components/Router'
import { ToastContainer } from 'react-toastify'

// ponerle modal para cuando se le de click a el boton de pregunta
function App() {
  return (
    <div className="min-h-screen flex flex-col font-Rubik">
      <NavBar />
      <Router />
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  )
}

export default App

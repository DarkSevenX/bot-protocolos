import { Home } from '../pages/Home'
import { Main } from '../pages/Main'
import { useNavigate } from '../context/RouterContext'

export const Router = () => {
  const { route } = useNavigate()

  switch (route) {
    case 'home':
      return <Home />
    case 'main':
      return <Main />
  }
}

import { createContext, useContext, useState } from 'react'

type Routes = 'individual' | 'colab' | 'home'

type RouterTypes = {
  route: Routes
  navigate: (route: Routes) => void
}

const RouterContext = createContext<RouterTypes | null>(null)

export const RouterContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [route, setRoute] = useState<Routes>('individual')

  const navigate = (route: Routes) => {
    setRoute(route)
  }

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

export const useNavigate = () => {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('usenavigate debe usarse en RouterContextProvider')
  }
  return context
}

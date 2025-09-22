import {Home} from '../pages/Home';
import {Individual} from '../pages/Individual';
import { useNavigate } from '../context/RouterContext';

export const Router = () => {
  const { route } = useNavigate()

  switch (route) {
    case 'home':
      return <Home/>
    case 'individual':
      return <Individual/>
  }
}

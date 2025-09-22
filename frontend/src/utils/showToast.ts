import { toast } from 'react-toastify'

type ToastType = 'success' | 'error' | 'warning' | 'info'

export const showToast = (message: string, type:ToastType = 'success') => {
  const bgClass = '!bg-zinc-900 !text-white'

  switch (type) {
    case 'success':
      toast.success(message, {
        className: bgClass,
      })
      break
    case 'error':
      toast.error(message, {
        className: bgClass,
      })
      break
    case 'warning':
      toast.warn(message, {
        className: bgClass,
      })
      break
    case 'info':
    default:
      toast.info(message, {
        className: bgClass,
      })
      break
  }
}

import api from '../config/axios'

export const createProtocol = async (temas: string, fileName: string) => {
  const response = await api.post(
    '/api/protocol',
    { temas },
    {
      responseType: 'blob',
    },
  )

  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${fileName || 'protocolo_individual'}.docx`)

  document.body.appendChild(link)
  link.click()
  window.URL.revokeObjectURL(url)

  return response
}

import api from '../config/axios'

export const createProtocol = async (temas: string, type: string, fileName: string) => {
  try {
    const response = await api.post(
      '/api/protocolo',
      { temas, type },
      {
        responseType: 'blob', // Mantiene la expectativa de un archivo binario
      }
    );

    // Verifica si la respuesta es exitosa (código 200)
    if (response.status === 200 && response.data.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // Manejo del archivo .docx
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName || 'protocolo_individual'}.docx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Limpieza del DOM
      window.URL.revokeObjectURL(url);
      return response;
    } else {
      // Si la respuesta no es un archivo esperado, intenta leer como JSON
      const text = await response.data.text(); // Convierte el blob a texto
      const json = JSON.parse(text); // Intenta parsear como JSON
      throw new Error(json.message || 'Error desconocido en la respuesta');
    }
  } catch (error: any) {
    // Manejo de errores
    if (error.response) {
      // La API devolvió un error con un cuerpo de respuesta
      try {
        // Intenta convertir el blob de error a JSON
        const text = await error.response.data.text();
        const json = JSON.parse(text);
        console.error('Error desde la API:', json);
        throw new Error(json.message || 'Error en la respuesta de la API');
      } catch (parseError) {
        console.error('No se pudo parsear el error:', parseError);
        throw new Error('Error desconocido al procesar la respuesta');
      }
    } else {
      // Otros errores (como problemas de red)
      console.error('Error en la solicitud:', error.message);
      throw error;
    }
  }
};


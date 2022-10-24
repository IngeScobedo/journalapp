export const fileUpload = async (file) => {
  if (!file) throw new Error('Uso Incorrecto del metodo')

  const BASE_URL = import.meta.env.VITE_BASE_URL
  const CLOUD_NAME = import.meta.env.VITE_NAME
  const CLOUD_URL = `${BASE_URL}/${CLOUD_NAME}/upload`
  // eslint-disable-next-line no-undef
  const formData = new FormData()

  formData.append('upload_preset', 'journal')
  formData.append('file', file)

  try {
    const response = await fetch(CLOUD_URL, {
      method: 'POST',
      body: formData
    })
    if (!response.ok) throw new Error('Error al cargar el archivo')
    const { secure_url: secureUrl } = await response.json()
    return secureUrl
  } catch (error) {
    if (!file) throw new Error(error.message)
  }
}

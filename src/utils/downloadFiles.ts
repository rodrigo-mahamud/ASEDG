export default function downloadFiles(fileUrl: string, fileName: string) {
  fetch(fileUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    })
    .catch((error) => console.error('Error al descargar el archivo:', error))
}

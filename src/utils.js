// Gera um matiz de verde/âmbar estável a partir do título, para o pôster
// placeholder quando não há imagem cadastrada.
export function titleToHue(str = '') {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hues = [96, 84, 40, 30, 150, 60]
  return hues[Math.abs(hash) % hues.length]
}

export function formatDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  if (!y || !m || !d) return iso
  return `${d}/${m}/${y}`
}

// Extrai o ID de um vídeo a partir de várias formas de link do YouTube
// (youtube.com/watch?v=, youtu.be/, youtube.com/embed/, shorts/).
export function extractYoutubeId(url = '') {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  )
  return match ? match[1] : null
}

export function youtubeThumbnail(url) {
  const id = extractYoutubeId(url)
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null
}

// Lê um arquivo de imagem escolhido pelo usuário, redimensiona (mantendo a
// proporção) e devolve um data URL comprimido em JPEG — assim dá pra guardar
// foto de perfil/capa no localStorage sem estourar o limite de espaço.
export function compressImage(file, maxDim = 700, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Não foi possível ler o arquivo'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Não foi possível abrir a imagem'))
      img.onload = () => {
        let { width, height } = img
        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width)
          width = maxDim
        } else if (height >= width && height > maxDim) {
          width = Math.round((width * maxDim) / height)
          height = maxDim
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d').drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

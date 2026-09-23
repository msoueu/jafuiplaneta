// Dados iniciais do jafuiplaneta.
// Os títulos abaixo já entram cadastrados: um punhado de clássicos cinéfilos
// e a lista "Sessão com você", com o que vocês têm assistido/vão assistir juntos.

let counter = 0
const id = () => `seed-${++counter}-${Date.now().toString(36)}`

export const SESSAO_LIST_NAME = 'Sessão com você'

export const seedMovies = [
  {
    id: id(),
    title: 'A Origem',
    originalTitle: 'Inception',
    type: 'filme',
    year: 2010,
    genre: 'Ficção científica',
    poster: '',
    youtubeUrl: '',
    watched: true,
    watchedDate: '',
    rating: 5,
    review:
      'Christopher Nolan brincando com camadas de sonho — daquelas sessões que rendem discussão até tarde.',
    isFavorite: true,
    isDisliked: false,
    lists: [SESSAO_LIST_NAME],
  },
  {
    id: id(),
    title: 'Outros',
    originalTitle: 'The Others',
    type: 'filme',
    year: 2001,
    genre: 'Suspense/Terror',
    poster: '',
    youtubeUrl: '',
    watched: true,
    watchedDate: '',
    rating: 4,
    review: 'Terror de atmosfera, sem sustos baratos. Nicole Kidman impecável.',
    isFavorite: false,
    isDisliked: false,
    lists: [SESSAO_LIST_NAME],
  },
  {
    id: id(),
    title: 'Adults',
    originalTitle: 'Adults',
    type: 'série',
    year: 2025,
    genre: 'Comédia',
    poster: '',
    youtubeUrl: '',
    watched: false,
    watchedDate: '',
    rating: 0,
    review: '',
    isFavorite: false,
    isDisliked: false,
    lists: [SESSAO_LIST_NAME],
  },
  {
    id: id(),
    title: 'A Maldição da Residência Hill',
    originalTitle: 'The Haunting of Hill House',
    type: 'série',
    year: 2018,
    genre: 'Terror',
    poster: '',
    youtubeUrl: '',
    watched: false,
    watchedDate: '',
    rating: 0,
    review: '',
    isFavorite: false,
    isDisliked: false,
    lists: [SESSAO_LIST_NAME],
  },
  {
    id: id(),
    title: 'A Maldição da Mansão Bly',
    originalTitle: 'The Haunting of Bly Manor',
    type: 'série',
    year: 2020,
    genre: 'Terror',
    poster: '',
    youtubeUrl: '',
    watched: false,
    watchedDate: '',
    rating: 0,
    review: '',
    isFavorite: false,
    isDisliked: false,
    lists: [SESSAO_LIST_NAME],
  },
]

export const emptyProfile = {
  avatar: '/img/avatar-default.jpg',
  background: '/img/bg-ambient.jpg',
  status: 'assistindo, avaliando e anotando o que passa pela tela 🍃',
}

# jafuiplaneta 🍃

Um perfil de cinéfilo pessoal, no estilo Letterboxd — feito pra dar de presente. Foto de
perfil, fundo personalizado, status, filmes favoritos, filmes que não curtiu, comentários
e um diário completo de filmes/séries assistidos (com avaliação em folhas, no lugar de
estrelas).

Tudo é salvo no navegador (localStorage) — não precisa de internet nem de servidor depois
de instalado, e os dados ficam só naquele computador/navegador.

## Como rodar

Pré-requisito: ter o [Node.js](https://nodejs.org/) instalado (versão 18 ou mais recente).

1. Abra um terminal dentro desta pasta (`jafuiplaneta`).
2. Instale as dependências:
   ```
   npm install
   ```
3. Rode o site:
   ```
   npm run dev
   ```
4. Abra o endereço que aparecer no terminal (algo como `http://localhost:5173`) no navegador.

Para parar, `Ctrl + C` no terminal. Para rodar de novo depois, basta repetir o passo 3
(não precisa reinstalar).

## O que já vem pronto

- **Foto de perfil**: clique em "editar foto" no avatar circular.
- **Fundo**: clique em "trocar fundo" na barra de cima — usei uma das fotos que você me
  mandou (a do olho refletindo a cena) como padrão, mas dá pra trocar a qualquer momento.
- **Status**: clique no textinho abaixo do nome pra editar.
- **Nome**: clique no botão "editar perfil" ao lado do nome.
- **Favoritos / Não curti**: ao adicionar ou editar um título já assistido, marque
  "★ marcar como favorito" ou "✕ não curti" — eles aparecem automaticamente nessas
  seções da página.
- **Comentários**: toda resenha que você escrever num título assistido aparece na seção
  de comentários do perfil.
- **Imagem ou YouTube**: em cada filme/série, você pode colar a URL de um pôster ou o
  link de um vídeo do YouTube (trailer, cena, o que quiser). Se não tiver pôster, o
  site usa automaticamente a miniatura do vídeo do YouTube como imagem.
- Os 5 títulos que já vêm cadastrados (A Origem, Outros, Adults, A Maldição da
  Residência Hill e A Maldição da Mansão Bly) estão na lista **"Sessão com você"**, na
  aba **Listas**.

## Estrutura do projeto

```
public/img/               fotos padrão (avatar, fundo, adesivo decorativo)
src/
  App.jsx                  tela principal e navegação
  index.css                todo o visual
  components/
    Navbar.jsx              barra de cima (logo, busca, trocar fundo, adicionar)
    ProfileHeader.jsx        cartão de perfil (foto, nome, status, estatísticas)
    HighlightRow.jsx         seções de Favoritos / Não curti
    CommentsFeed.jsx         lista de comentários/resenhas
    MovieCard.jsx / MovieGrid.jsx   cartões e grades de filmes
    MovieFormModal.jsx       formulário de adicionar/editar título
    RatingLeaves.jsx         avaliação em folhas
  data/seedMovies.js         títulos pré-cadastrados e perfil padrão
  hooks/useLocalStorage.js   salva tudo no navegador
```

## Se quiser publicar online depois

Hoje o site roda só local. Se um dia quiser colocar num link (Vercel, Netlify etc.), é só
pedir — dá pra publicar o mesmo projeto sem grandes mudanças.

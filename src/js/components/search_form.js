const BASE_URL = 'https://api.themoviedb.org/3/';
// https://api.themoviedb.org/3/movie/550?api_key=ca1cb5cf0962813c7315de2a2830def2
const API_KEY = 'ca1cb5cf0962813c7315de2a2830def2';

// считать c импута и вывести в консоль

const form = document.querySelector('.search-form');
form.addEventListener('submit', onSearch);
const input = document.querySelector('.search-input');

const gallery = document.querySelector('.gallery');
const galleryList = document.querySelector('.gallery__list');

function onSearch(event) {
  event.preventDefault();
  const valueInput = event.currentTarget.elements.searchQuery.value;
  fetchCards(valueInput)
    .then(appendFilmCardsMarkup)
    .catch(error => console.log(error));
}
function fetchCards(searchQuery) {
  const url = `${BASE_URL}search/collection?api_key=${API_KEY}&query=${searchQuery}&language=en-US&page=1`;
  return fetch(url).then(response => response.json());
}

function onLoadMainPage() {
  fetchTrandsCards()
    .then(appendFilmCardsMarkup)
    .catch(error => console.log(error));
}

function fetchTrandsCards() {
  const url = `${BASE_URL}trending/movie/day?api_key=${API_KEY}`;
  return fetch(url).then(response => response.json());
}
function appendFilmCardsMarkup(obj) {
  galleryList.innerHTML = '';
  const markup = obj.results
    .map(
      ({ original_title, release_date, poster_path, id, genre_ids }) =>
        `<li class='gallery-list__item'>
      <a class='gallery-list__card'>
      <div class="poster__card">
        <img
          class='gallery-list__img'
          src='https://image.tmdb.org/t/p/w500/${poster_path}'
          alt='${original_title}'
          loading='lazy'
          width ="100%"
         
        />
        </div>
      <div class="info__card">
      <p class="title__card">${original_title}</p>
      <p>${genre_ids} | </p>
      <p>${new Date(release_date).getFullYear()}</p>
      </div>
      </a>
      </li>`,
    )
    .join('');
  // console.log(obj.results);
  galleryList.insertAdjacentHTML('beforeend', markup);
}
onLoadMainPage();

// выводит массив жанров
function fetchGenres() {
  const url = `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`;
  const fetchGenre = fetch(url).then(response => response.json());
  const nameGenre = fetchGenre.then(array => array.genres.map(obj => console.log(obj)));
  return nameGenre;
}
fetchGenres();

// вывод жанра по id
function markUpGenre(array) {
  for (const el of array) {
    const list_genres = fetchGenres();
    console.log(list_genres);
    // if (el === fetchGenres array.id) {
    //   console.log(array.name);
  }
}
// markUpGenre([28, 119]);

// markUpGenre(28);
// const genres = fetchGenres()
//   .then(markUpGenres)
//   .catch(error => console.log(error));

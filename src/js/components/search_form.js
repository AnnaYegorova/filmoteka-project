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
  const data = new Date();
  const markup = obj.results
    .map(
      ({ original_title, release_date, poster_path, id }) =>
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
      <p>${id} | </p>
      <p>${release_date.getYear()}</p>
      </div>
      </a>
      </li>`,
    )
    .join('');
  galleryList.insertAdjacentHTML('beforeend', markup);
}
onLoadMainPage();

// выводит массив жанров
function fetchGenres() {
  const url = `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`;
  return fetch(url).then(response => response.json());
}
function markUpGenres(array) {
  const result = array.genres.map(({ id, name }) => console.log(name));
}

// fetchGenres()
//   .then(markUpGenres)
//   .catch(error => console.log(error));

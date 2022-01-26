import './sass/main.scss';

const BASE_URL = 'https://api.themoviedb.org/3/';
// https://api.themoviedb.org/3/movie/550?api_key=ca1cb5cf0962813c7315de2a2830def2
const API_KEY = 'ca1cb5cf0962813c7315de2a2830def2';

// считать c импута и вывести в консоль

const form = document.querySelector('.form');
form.addEventListener('submit', onSearch);
const input = document.querySelector('.form-input');

const gallery = document.querySelector('.gallery');

function onSearch(event) {
  event.preventDefault();

  const valueInput = event.currentTarget.elements.serchQuery.value;

  fetchCards(valueInput)
    .then(appendFilmCardsMarkup)
    .catch(error => console.log(error));
}
function fetchCards(searchQuery) {
  // const url = `${BASE_URL}/550?api_key=${API_KEY}`;
  const url = `${BASE_URL}search/collection?api_key=${API_KEY}&query=${searchQuery}&language=en-US&page=1`;
  return fetch(url).then(response => response.json());
}

function appendFilmCardsMarkup(obj) {
  const markup = obj.results
    .map(
      ({ name, backdrop_path, poster_path }) =>
        `<div class='film-card'>
      <a class='gallery__item' href='${poster_path}'>
        <img
          class='gallery__imag'
          src='${backdrop_path}'
          alt='${name}'
          loading='lazy'
          width='354'
          height='250'
        />
      </a>
      </div>`,
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

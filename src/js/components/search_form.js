import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
// https://api.themoviedb.org/3/movie/550?api_key=ca1cb5cf0962813c7315de2a2830def2
const API_KEY = 'ca1cb5cf0962813c7315de2a2830def2';

// считать c импута и вывести в консоль
const options = {
  total_pages: 0,
  allGenresList: [],
};

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
async function fetchCards(searchQuery) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}search/collection?api_key=${API_KEY}&query=${searchQuery}&language=en-US&page=1`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

function onLoadMainPage() {
  fetchTrandsCards()
    .then(appendFilmCardsMarkup)
    .catch(error => console.log(error));
}

async function fetchTrandsCards() {
  try {
    const { data } = await axios.get(`${BASE_URL}trending/movie/day?api_key=${API_KEY}`);
    return data;
  } catch (error) {
    console.log(error);
  }
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
      <p>${galleryMarkUpGenre(genre_ids)} | </p>
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
async function fetchGenres() {
  try {
    const { data } = await axios.get(
      `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
fetchGenres();

// вывод жанра по id

async function genresMarkUp() {
  const res = await fetchGenres();
  const result = res.genres.map(({ id, name }) => {
    options.allGenresList.push({ id, name });
  });

  return result;
}
genresMarkUp();

function galleryMarkUpGenre(array) {
  console.log(array);
  let nameGenre = array.map(elem => {
    for (let el of options.allGenresList) {
      console.log('el', el);
      console.log(options.allGenresList);
      if (elem === el.id) {
        return el.name;
      }
    }
  });
  console.log(nameGenre);
  return nameGenre.join(', ');
}

import './css/styles.css';
import { fetchCountries } from './css/js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  let search = refs.input.value.trim();

  if (search.length === 0) {
    console.log('пустная строка');
    return (refs.ul.innerHTML = '');
  }

  fetchCountries(search)
    .then(result => {
      console.log(result);

      if (result.length > 10) {
        console.log('приехало больше 10 стран');
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }

      if (result.length >= 2 && result.length <= 10) {
        console.log('все ок, рендерю...', result);
        renderСountriesList(result);
      }

      if (result.length === 1) {
        console.log('вот она =)', result);
        refs.ul.innerHTML = '';
        rendercountry(result);
      }
    })
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function renderСountriesList(countries) {
  const markup = countries
    .map(country => {
      return `<li class="country-item">
          <img class="country-img" src="${country.flags.svg}" alt="" width="20">
          <p class="country-title">${country.name.official}</p>
        </li>`;
    })
    .join('');
  refs.ul.innerHTML = markup;
}

function rendercountry(country) {
  const markup = country
    .map(country => {
      console.log(Object.values(country.languages).join(' '));
      return `<article>
  <h1>${country.name.official}</h1>
  <img src="${country.flags.svg}" alt="" width="20">
  <p>Capital: ${country.capital}</p>
  <p>Population: ${country.population}</p>
  <p>Languages: ${Object.values(country.languages).join(' , ')}</p>
</article>`;
    })
    .join('');
  refs.ul.innerHTML = markup;
}

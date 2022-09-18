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
    return (refs.ul.innerHTML = '');
  }

  fetchCountries(search)
    .then(result => {
      if (result.length > 10) {
        refs.ul.innerHTML = '';
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (result.length >= 2 && result.length <= 10) {
        refs.div.innerHTML = '';
        renderСountriesList(result);
      } else {
        refs.ul.innerHTML = '';
        renderCountry(result);
      }
    })
    .catch(() =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function renderСountriesList(countries) {
  const markup = countries
    .map(country => {
      return `<li class="country-list__item container">
          <img class="country-list__img" src="${country.flags.svg}" alt="National Flag of ${country.name.official}" width="20">
          <p class="country-list__name">${country.name.official}</p>
        </li>`;
    })
    .join('');
  refs.ul.innerHTML = markup;
}

function renderCountry(country) {
  const markup = country
    .map(country => {
      return `<div class="container"><img
  class="country-info__img"
  src="${country.flags.svg}"
  alt="National Flag of ${country.name.official}"
  width="40"
/>
<p class="country-info__name">${country.name.official}</p></div>
<p class="country-info__item">
  <span class="country-info__accent">Capital: </span>${country.capital}
</p>
<p class="country-info__item">
  <span class="country-info__accent">Population: </span>${country.population}
</p>
<p class="country-info__item">
  <span class="country-info__accent">Languages: </span
  >${Object.values(country.languages).join(', ')}
</p>`;
    })
    .join('');
  refs.div.innerHTML = markup;
}

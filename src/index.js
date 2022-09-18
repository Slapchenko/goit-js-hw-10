import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputField: document.querySelector('#search-box'),
  listОfСountries: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputField.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  let searchQuery = refs.inputField.value.trim();

  if (searchQuery.length === 0) {
    clearСountriesList();
  }

  fetchCountries(searchQuery)
    .then(result => {
      if (result.length > 10) {
        clearСountriesList();
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (result.length >= 2 && result.length <= 10) {
        clearСountryInfo();
        renderСountriesList(result);
      } else {
        clearСountriesList();
        renderCountryInfo(result);
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
  refs.listОfСountries.innerHTML = markup;
}

function renderCountryInfo(country) {
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
  <span class="country-info__accent">Population: </span>${new Intl.NumberFormat(
    'en-En'
  ).format(country.population)}
</p>
<p class="country-info__item">
  <span class="country-info__accent">Languages: </span
  >${Object.values(country.languages).join(', ')}
</p>`;
    })
    .join('');
  refs.countryInfo.innerHTML = markup;
}

function clearСountriesList() {
  refs.listОfСountries.innerHTML = '';
}

function clearСountryInfo() {
  refs.countryInfo.innerHTML = '';
}

import './css/styles.css';
import { fetchCountries } from './js/fetch-countries';
import { renderСountriesList } from './js/render-countries-list';
import { renderCountryInfo } from './js/render-country-info';
import { clearСountriesList, clearСountryInfo } from './js/reset-markup';
import getRefs from './js/get-refs';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.inputField.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  let searchQuery = refs.inputField.value.trim();

  if (searchQuery.length === 0) {
    clearСountriesList();
    clearСountryInfo();
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

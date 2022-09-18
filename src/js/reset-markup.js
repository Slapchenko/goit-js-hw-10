import getRefs from './get-refs';

const refs = getRefs();

export function clearСountriesList() {
  refs.listОfСountries.innerHTML = '';
}

export function clearСountryInfo() {
  refs.countryInfo.innerHTML = '';
}

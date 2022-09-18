import getRefs from './get-refs';

const refs = getRefs();

export function renderСountriesList(countries) {
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

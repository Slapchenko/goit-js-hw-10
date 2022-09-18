import getRefs from './get-refs';

const refs = getRefs();

export function renderCountryInfo(country) {
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

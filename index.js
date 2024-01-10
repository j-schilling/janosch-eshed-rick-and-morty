import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
var searchQuery = "";

export async function fetchCharacters() {
  let url = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;
  cardContainer.innerHTML = "";
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const characters = data.results;
  // characters
  console.log("characters: ", characters);

  characters.forEach((character) => {
    // console.log(character);
    const createCard = createCharacterCard(
      character.name,
      character.image,
      character.status,
      character.type
    );
    cardContainer.append(createCard);
    maxPage = data.info.pages;
    console.log("maxPage: ", maxPage);
    pagination.innerText = `${page} / ${maxPage}`;
  });
  // return characters;
}

fetchCharacters();

nextButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (page < maxPage) {
    page = page + 1;
    fetchCharacters();
    console.log("Youre on page: ", page);
  }
});

prevButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (page > 1) {
    page = page - 1;
    fetchCharacters(page);
    console.log("Youre on page: ", page);
  }
});

searchBar.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.query.value;
  console.log("searchQuery: ", searchQuery);
  fetchCharacters();
});

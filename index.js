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
const maxPage = 1;
const page = 1;
const searchQuery = "";

createCharacterCard();

export async function fetchData() {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();
  const characters = data.results;
  // characters
  console.log("characters: ", characters);

  characters.forEach((character) => {
    console.log(character);
    const createCard = createCharacterCard(
      character.name,
      character.image,
      character.status,
      character.type
    );
    cardContainer.append(createCard);
  });
  // return characters;
}

const dataCharacters = fetchData();
console.log(dataCharacters);

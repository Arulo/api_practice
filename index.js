const application = document.getElementById("container");

let initialOffset = 0;
let pageSize = 50;
let initialLimit = pageSize;

function getPokemonAndCreateSetOfCards(offset, limit){
  fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`, {
    method: "GET"
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      data.results.forEach(function(pokemon) {
        //Gets Each Pokemon URL to later fetch data from each endpoint individually
        const pokemonUrl = pokemon.url;

        fetch(pokemonUrl, {
          method: "GET"
        })
          .then(function(individualPokemonInformation) {
            return individualPokemonInformation.json();
          })
          .then(function(pokemonData) {
            //Gets a few pokemon attributes
            const pokemonImage = pokemonData.sprites.front_default;
            const pokemonName = pokemonData.name;
            const pokemonNumber = pokemonData.id;
            //Turns types into a new array containing the type names and turns them into a , separated string
            const pokemonTypeContent = pokemonData.types.map(type => {
              return type.type.name;
            });
            const pokemonTypes = pokemonTypeContent.join(", ");

            const card = cardCreation(
              pokemonImage,
              pokemonName,
              pokemonNumber,
              pokemonTypes
            );

            //Build Cards
            application.appendChild(card);
          });
      });
    })
    .catch(function(err) {
      console.log(err);
      // Error :(
    });
};
//This line below renders the first set of Pokemon as soon as the site loads.
getPokemonAndCreateSetOfCards(initialOffset, initialLimit)


// Here we add functionality to the "Load More" button by making additional calls to the previous function with increasing variable values
  document.getElementById("loadMore").onclick = function () {fetchMorePokemon()};

  let pageStart = pageSize;

  function fetchMorePokemon (){
    getPokemonAndCreateSetOfCards(pageStart, pageSize);
    pageStart = pageStart + pageSize;
  };

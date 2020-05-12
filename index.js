const application = document.getElementById("container");

fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100", {
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

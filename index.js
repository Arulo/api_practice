const application = document.getElementById("root");
const container = document.createElement("div");
container.setAttribute("class", "container");
application.appendChild(container);

fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=251", {
  method: "GET"
})
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    data.results.forEach(function(pokemon) {
      //Gets Pokemon Names to later fetch each endpoint individually
      const pokemonName = pokemon.name;
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`, {
        method: "GET"
      })
        .then(function(individualPokemonEndpoint) {
          return individualPokemonEndpoint.json();
        })
        .then(function(individualPokemonData) {
          //Gets a few pokemon attributes
          const image = imageCreation(individualPokemonData);
          const capitalisedName =
            individualPokemonData.name.charAt(0).toUpperCase() +
            individualPokemonData.name.substring(1);
          const pokemonNumber = individualPokemonData.id;

          //Creates a card slot per pokemon.
          const card = document.createElement("div");
          card.setAttribute("class", "card");

          //Adds an Heading containing the number and the capitalised name of each pokemon
          const heading = document.createElement("h1");
          heading.setAttribute("class", "pokemon_name");
          heading.textContent = `${capitalisedName}`;

          //Create a Card Header div
          const cardHeader = document.createElement("div");
          cardHeader.setAttribute("class", "card_header");

          // Adds a little pokeball on the card header
          const pokeBallImg = document.createElement("img");
          pokeBallImg.setAttribute("src", "img/pokeball.png");
          pokeBallImg.setAttribute("class", "pokeball_image");

          //Get and add Pokemon number on the card header
          const pokemonNumberStamp = document.createElement("h3");
          pokemonNumberStamp.setAttribute("class", "pokemon_number");
          pokemonNumberStamp.textContent = `#${pokemonNumber}`;

          // Creates a container for the Pokemon Types
          const typeContainer = document.createElement("div");
          typeContainer.setAttribute("class", "type_container");

          //Get the types and displays them with a comma or without depending if there's any additional types
          individualPokemonData.types.forEach(function(pokemonTypes, key) {
            const pokemonTypeNames = pokemonTypes.type.name;

            if (key === individualPokemonData.types.length - 1) {
              typeContainer.textContent += `${pokemonTypeNames}`;
            } else {
              typeContainer.textContent += `${pokemonTypeNames}, `;
            }
          });

          //Build Card
          container.appendChild(card);
          //Build Card Header
          card.appendChild(cardHeader);
          card.appendChild(image);
          cardHeader.appendChild(pokeBallImg);
          cardHeader.appendChild(pokemonNumberStamp);
          //Build Card Contents
          card.appendChild(heading);
          card.appendChild(typeContainer);
        });
    });
  })
  .catch(function(err) {
    console.log(err);
    // Error :(
  });

const application = document.getElementById("container");

fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=251", {
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
          const image = imageCreation(pokemonData);
          const pokemonName = pokemonData.name;
          const pokemonNumber = pokemonData.id;
          const pokemonTypeContent = pokemonData.types.map(type => {
            return type.type.name;
          });
          const pokemonTypes = pokemonTypeContent.join(", ");

          //Creates a card slot per pokemon.
          const card = document.createElement("div");
          card.setAttribute("class", "card");

          //Adds an Heading containing the number and the capitalised name of each pokemon
          const heading = document.createElement("h1");
          heading.setAttribute("class", "pokemon_name");
          heading.textContent = `${pokemonName}`;

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
          typeContainer.textContent = `${pokemonTypes}`;

          //Build Card Header
          card.appendChild(cardHeader);
          card.appendChild(image);
          cardHeader.appendChild(pokeBallImg);
          cardHeader.appendChild(pokemonNumberStamp);
          //Build Card Contents
          card.appendChild(heading);
          card.appendChild(typeContainer);

          //Build Card
          application.appendChild(card);
        });
    });
  })
  .catch(function(err) {
    console.log(err);
    // Error :(
  });

const application = document.getElementById("root");
const container = document.createElement("div");
container.setAttribute("class", "container");
application.appendChild(container);

fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=720", {
  method: "GET"
})
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    //Get each pokemon and creates a card slot per pokemon.
    data.results.forEach(function(pokemon) {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      //Gets the Pokemon Number from the URL inside each Pokemon Object
      const url = pokemon.url.split("/").filter(i => i);
      let pokemonNumber = url[url.length - 1];

      //Gets and capitalises the Pokemon Name from each Pokemon Object
      let capitalisedName =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1);

      //Adds an H1 containing the number and the capitalised name of each pokemon
      const h1 = document.createElement("h1");
      h1.setAttribute("class", "pokemon_name");
      h1.textContent = `${capitalisedName}`;

      //Gets image from the pokemondb and shows it into the card.
      const image = document.createElement("img");
      image.setAttribute(
        "src",
        `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name}.png`
      );
      image.setAttribute("class", "pokemon_photo");

      //Gets the pokemon types and prints them in the card
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`, {
        method: "GET"
      })
        .then(function(singlePokemonInformation) {
          return singlePokemonInformation.json();
        })
        .then(function(singlePokemonData) {
          // Creates a Container for the Types of each Pokemon
          const typeContainer = document.createElement("div");
          typeContainer.setAttribute("class", "type_container");

          //Get the types and displays them with a comma or without depending if there's any additional types
          singlePokemonData.types.forEach(function(pokemonTypes, key) {
            let pokemonTypeNames = pokemonTypes.type.name;
            if (key === singlePokemonData.types.length - 1) {
              typeContainer.innerHTML += `${pokemonTypeNames}`;
            } else {
              typeContainer.innerHTML += `${pokemonTypeNames}, `;
            }
          });

          //Create a Card Header div
          let cardHeader = document.createElement("div");
          cardHeader.setAttribute("class", "card_header");

          // Adds a little pokeball on the card header
          let pokeBallImg = document.createElement("img");
          pokeBallImg.setAttribute("src", "img/pokeball.png");
          pokeBallImg.setAttribute("class", "pokeball_image");

          //Get and add Pokemon number on the card header
          let pokemonNumberStamp = document.createElement("h3");
          pokemonNumberStamp.setAttribute("class", "pokemon_number");
          pokemonNumberStamp.textContent = `#${pokemonNumber}`;

          //Build Card
          container.appendChild(card);
          //Build Card Header
          card.appendChild(cardHeader);
          cardHeader.appendChild(pokeBallImg);
          cardHeader.appendChild(pokemonNumberStamp);
          //Build Card Contents
          card.appendChild(image);
          card.appendChild(h1);
          card.appendChild(typeContainer);
        });
    });
  })
  .catch(function(err) {
    console.log(err);
    // Error :(
  });

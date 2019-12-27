// url (required), options (optional)
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
    //Get each pokemon and creates a card per pokemon.
    data.results.forEach(function(pokemon) {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      //Adds an H1 containing the capitalised name of that said pokemon.
      const h1 = document.createElement("h1");
      let capitalisedName =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1);
      h1.setAttribute("class", "pokemon_name");
      h1.textContent = `${capitalisedName}`;

      //Gets image from the pokemondb and posts it into the card.
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
        .then(function(pokemonInformation) {
          return pokemonInformation.json();
        })
        .then(function(pokemonObject) {
          const typeContainer = document.createElement("div");
          typeContainer.setAttribute("class", "type_container");

          pokemonObject.types.forEach(function(pokemonTypes, key) {
            let pokemonTypeNames = pokemonTypes.type.name;
            if (key === pokemonObject.types.length - 1) {
              typeContainer.innerHTML += `${pokemonTypeNames}`;
            } else {
              typeContainer.innerHTML += `${pokemonTypeNames}, `;
            }

            container.appendChild(card);
            card.appendChild(h1);
            card.appendChild(image);
            card.appendChild(typeContainer);
          });
        });
    });
  })
  .catch(function(err) {
    console.log(err);
    // Error :(
  });

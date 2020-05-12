function imageCreation(data) {
  const image = document.createElement("img");

  image.onerror = function() {
    image.setAttribute("src", "img/unidentified.png");
  };
  image.setAttribute("src", `${data}`);
  image.setAttribute("class", "pokemon_image");

  return image;
}

function cardCreation(image, name, number, types) {
  //Creates a card slot.
  const card = document.createElement("div");
  card.setAttribute("class", "card");

  const pokemonImage = imageCreation(image);

  //Create a Card Header div
  const cardHeader = document.createElement("div");
  cardHeader.setAttribute("class", "card_header");

  // Adds a little pokeball on the card header
  const pokeBallImg = document.createElement("img");
  pokeBallImg.setAttribute("src", "img/pokeball.png");
  pokeBallImg.setAttribute("class", "pokeball_image");

  //Add pokemon number to the card
  const pokemonNumberStamp = document.createElement("h3");
  pokemonNumberStamp.setAttribute("class", "pokemon_number");
  pokemonNumberStamp.textContent = `#${number}`;

  //Adds an Heading containing the name of each pokemon
  const heading = document.createElement("h1");
  heading.setAttribute("class", "pokemon_name");
  heading.textContent = `${name}`;

  //Add a container with the pokemon type/s
  const typeContainer = document.createElement("div");
  typeContainer.setAttribute("class", "type_container");
  typeContainer.textContent = `${types}`;

  //Build Card Header
  card.appendChild(cardHeader);
  cardHeader.appendChild(pokeBallImg);
  cardHeader.appendChild(pokemonNumberStamp);

  //Build Card Contents
  card.appendChild(pokemonImage);
  card.appendChild(heading);
  card.appendChild(typeContainer);

  return card;
}

function imageCreation(pokemonName) {
  const image = document.createElement("img");
  let imageURL = `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemonName}.png`;

  image.onerror = function() {
    image.setAttribute("src", "img/unidentified.png");
  };

  image.setAttribute("src", `${imageURL}`);

  image.setAttribute("class", "pokemon_photo");

  return image;
}

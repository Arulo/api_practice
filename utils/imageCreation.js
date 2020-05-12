function imageCreation(data) {
  const image = document.createElement("img");

  image.onerror = function() {
    image.setAttribute("src", "img/unidentified.png");
  };
  image.setAttribute("src", `${data.sprites.front_default}`);
  image.setAttribute("class", "pokemon_photo");

  return image;
}

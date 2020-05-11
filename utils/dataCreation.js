function dataCreation(pokemon) {
  // Returns Pokemon Number and name with Capital Case
  const pokemonName = pokemon.name;
  const url = pokemon.url.split("/").filter(i => i);
  const pokemonNumber = url[url.length - 1];
  const capitalisedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1);

  return {
    pokemonName: pokemonName,
    pokemonNumber: pokemonNumber,
    capitalisedName: capitalisedName
  };
}

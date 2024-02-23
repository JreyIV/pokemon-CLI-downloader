// Gets url for pokemon from prompt_poke_name() input
const getPokemonURL = async (selected_pokemon) => {
  const chosen_pokemon = Object.values(selected_pokemon)[0].toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${chosen_pokemon}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export { getPokemonURL };

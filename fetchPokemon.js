import fetch from "node-fetch";

const fetchName = (name) => {
  const selected_pokemon = Object.values(name)[0].toLowerCase();
  console.log(selected_pokemon);
  const pokemon_url = fetch(
    `https://pokeapi.co/api/v2/pokemon/${selected_pokemon}`
  );
  console.log(`Fetching data for ${selected_pokemon}`);
  getData(pokemon_url);
};

const getData = async (url) => {
  try {
    const result = await url;
    const poke_json = await result.json();
    console.log(poke_json);
  } catch (error) {
    console.log("Cannot find selected pokemon. Please try again");
  }
};

export { fetchName };

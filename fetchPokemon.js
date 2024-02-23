import fetch from "node-fetch";

// get input from inquirer and pass it to getData to fetch data on specified pokemon
const fetchName = (name) => {
  const selected_pokemon = Object.values(name)[0].toLowerCase();
  //   *for testing purposes*
  //   console.log(selected_pokemon);
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
    return poke_json;
    // something here? ^
  } catch (error) {
    console.log("Cannot find selected pokemon. Please try again");
  }
};

export { fetchName };

//TODO:
// -check which info the user selected
// -fetch data using poke_json from getData() according to the selected info

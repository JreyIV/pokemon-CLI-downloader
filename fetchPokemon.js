import fs from "fs/promises";

// Gets url for pokemon from prompt_poke_name() input
const getPokemonData = async (selected_pokemon, selected_info) => {
  const chosen_pokemon = Object.values(selected_pokemon)[0].toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${chosen_pokemon}`;
  const response = await fetch(url);
  const data = await response.json();
  //   console.log(data);
  //   console.log(selected_info);
  const info_array = Object.values(selected_info)[0];
  info_array.forEach((info) => {
    switch (info) {
      case "Stats":
        writeStats(chosen_pokemon, data);
        break;
      case "Sprites":
        console.log("=====SPRITES=====");
        console.log(data.sprites);
        break;
      case "Artwork":
        console.log("=====ARTWORK=====");
        console.log(data.sprites.other["official-artwork"]);
        break;
    }
  });
};

const writeStats = (chosen_pokemon, data) => {
  let statFile = "";
  data.stats.forEach((statObject) => {
    const { base_stat, stat } = statObject;
    statFile += `${stat.name}: ${base_stat}\n`;
  });
  console.log(`Saved: ${chosen_pokemon}/stats.txt`);
  return fs.writeFile(`stats.txt`, statFile, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

export { getPokemonData };

import inquirer from "inquirer";
import { getPokemonData } from "./fetchPokemon.js";

const prompt_poke_name = async () => {
  return await inquirer.prompt({
    name: "pokemon_name",
    message: "Pokemon name:",
    type: "input",
    validate: async (pokemon_name) => {
      const chosen_pokemon = pokemon_name.toLowerCase();
      const url = `https://pokeapi.co/api/v2/pokemon/${chosen_pokemon}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          return `Cannot find "${pokemon_name}" in the database. Please try again.`;
        }
        return true;
      } catch (err) {
        return err.message;
      }
    },
  });
};

const prompt_poke_info = async () => {
  return await inquirer.prompt({
    name: "pokemon_info",
    message: "Pokemon info to download:",
    type: "checkbox",
    choices: ["Stats", "Sprites", "Artwork"],
  });
};

const prompt_new_pokemon = async () => {
  return await inquirer.prompt({
    name: "pokemon_new",
    message: "Would you like to search for another pokemon?",
    type: "list",
    choices: ["Yes", "No"],
  });
};

const prompt_user = async () => {
  const getName = await prompt_poke_name();
  const getInfo = await prompt_poke_info();
  const getData = await getPokemonData(getName, getInfo);
  process.exit();
};

export { prompt_user };

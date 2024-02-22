import inquirer from "inquirer";
import { fetchData } from "./fetchPokemon.js";

const questions = [
  {
    name: "pokemon_name",
    message: "Pokemon name:",
    type: "input",
  },
  {
    name: "pokemon_info",
    message: "Pokemon info to download:",
    type: "checkbox",
    choices: ["Stats", "Sprites", "Artwork"],
  },
  {
    name: "pokemon_new",
    message: "Would you like to search for another pokemon?",
    type: "confirm",
  },
];

const prompt_user = () => {
  inquirer.prompt(questions).then((answers) => {
    fetchData(answers);
  });
};

export { prompt_user };

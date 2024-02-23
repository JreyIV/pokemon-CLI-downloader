import inquirer from "inquirer";
import { fetchName } from "./fetchPokemon.js";

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
  inquirer.prompt(questions[0]).then((name) => {
    fetchName(name);
  });
  // .then(() => {
  //   inquirer.prompt(questions[1]).then((info) => {
  //     console.log(info);
  //   });
  // });
};

export { prompt_user };

import inquirer from "inquirer";
import { fetchName } from "./fetchPokemon.js";

// const questions = [
//   {
//     name: "pokemon_name",
//     message: "Pokemon name:",
//     type: "input",
//     validate: async (input) => {
//       const url = `https://pokeapi.co/api/v2/pokemon/${input}`;
//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error(
//             "Pokemon not found. Please enter a valid Pokemon name."
//           );
//         }
//         return true;
//       } catch (error) {
//         return error.message;
//       }
//     },
//   },
//   {
//     name: "pokemon_info",
//     message: "Pokemon info to download:",
//     type: "checkbox",
//     choices: ["Stats", "Sprites", "Artwork"],
//   },
//   {
//     name: "pokemon_new",
//     message: "Would you like to search for another pokemon?",
//     type: "confirm",
//   },
// ];

// const prompt_user = () => {
//   inquirer
//     .prompt(questions[0])
//     .then((name) => {
//       fetchName(name);
//     })
//     .then(() => {
//       inquirer.prompt(questions[1]).then((info) => {
//         console.log(info);
//       });
//     });
// };

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
          return "unknown pokemon";
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

const prompt_user = async () => {
  const getName = await prompt_poke_name();
  console.log(getName);
  const getInfo = await prompt_poke_info();
  console.log(getInfo);
  process.exit();
};

export { prompt_user };

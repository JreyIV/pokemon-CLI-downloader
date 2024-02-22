import inquirer from "inquirer";

const prompt_user = () => {
  inquirer
    .prompt([
      {
        name: "pokemon_name",
        message: "Pokemon name:",
        type: "input",
      },
    ])
    .then((answer) => {
      console.log(answer);
    });
};

export { prompt_user };

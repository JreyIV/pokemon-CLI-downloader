import fetch from "node-fetch";

const fetchName = (name) => {
  const selected_pokemon = Object.values(name);
  console.log(`Fetching data for ${selected_pokemon}`);
};

export { fetchName };

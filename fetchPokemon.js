import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Gets url for pokemon from prompt_poke_name() input
const getPokemonData = async (selected_pokemon, selected_info) => {
  const chosen_pokemon = Object.values(selected_pokemon)[0].toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${chosen_pokemon}`;
  const response = await fetch(url);
  const data = await response.json();
  //   console.log(data);
  //   console.log(selected_info);
  const folderName = `${chosen_pokemon}`;
  const folderPath = path.join(__dirname, folderName);
  const info_array = Object.values(selected_info)[0];
  for (const info of info_array) {
    switch (info) {
      case "Stats":
        await downloadStats(folderPath, data);
        break;
      case "Sprites":
        await downloadSprites(folderPath, data);
        break;
      case "Artwork":
        await downloadArtwork(folderPath, data);
        break;
    }
  }
};

const downloadStats = async (folderPath, data) => {
  const fileName = `stats.txt`;
  const filePath = path.join(folderPath, fileName);

  try {
    await fs.mkdir(folderPath, { recursive: true });
    let statFile = "";
    data.stats.forEach((statObject) => {
      const { base_stat, stat } = statObject;
      statFile += `${stat.name}: ${base_stat}\n`;
    });

    await fs.writeFile(filePath, statFile);
    console.log(`Saved: ${fileName}`);
  } catch (err) {
    console.error("Error:", err);
  }
};

const downloadSprites = async (folderPath, data) => {
  const { other, versions, ...filteredSprites } = data.sprites;

  try {
    await fs.access(folderPath);
  } catch (error) {
    if (error.code === "ENOENT") {
      try {
        await fs.mkdir(folderPath, { recursive: true });
      } catch (err) {
        console.error("Error creating folder:", err);
        return;
      }
    } else {
      console.error("Error accessing folder:", error);
      return;
    }
  }

  const savePromises = Object.entries(filteredSprites).map(
    async ([key, value]) => {
      if (value !== null) {
        const response = await fetch(value);
        const imageBuffer = await response.arrayBuffer();
        const imageFileName = `${key}.png`;
        const imagePath = path.join(folderPath, imageFileName);
        await fs.writeFile(imagePath, Buffer.from(imageBuffer));
        console.log(`Saved: ${imageFileName}`);
      }
    }
  );
  await Promise.all(savePromises);
};

const downloadArtwork = async (folderPath, data) => {
  const artwork = data.sprites.other["official-artwork"];
  //   console.log(artwork);
  try {
    await fs.access(folderPath);
  } catch (error) {
    if (error.code === "ENOENT") {
      try {
        await fs.mkdir(folderPath, { recursive: true });
      } catch (err) {
        console.error("Error creating folder:", err);
        return;
      }
    } else {
      console.error("Error accessing folder:", error);
      return;
    }
  }

  const savePromises = Object.entries(artwork).map(async ([key, value]) => {
    const response = await fetch(value);
    const imageBuffer = await response.arrayBuffer();
    const imageFileName = `${key}.png`;
    const imagePath = path.join(folderPath, imageFileName);
    await fs.writeFile(imagePath, Buffer.from(imageBuffer));
    console.log(`Saved: ${imageFileName}`);
  });
  await Promise.all(savePromises);
};

export { getPokemonData };

import fs from "fs";

async function Exec() {
  const file = fs.readFileSync("./cryptopunks/crypto_punks.json", "utf8");

  const data: {
    [x: string]: { type: string; image: string; accessories: string[] };
  } = JSON.parse(file);

  const newData: {
    [x: string]: {
      name: string;
      image: string;
      attributes: { trait_type: string; value: string }[];
    };
  } = {};

  for (const key of Object.keys(data)) {
    const metadata = data[key];
    const num = Number.parseInt(key);
    newData[num.toString()] = {
      name: `CryptoPunk #${num}`,
      image: metadata.image,
      attributes: [
        { trait_type: "Type", value: metadata.type },
        ...metadata.accessories.map((accessory) => ({
          trait_type: "Accessory",
          value: accessory,
        })),
      ],
    };
  }

  try {
    fs.unlinkSync(`cryptopunks/crypto_punks_metadata.json`);
  } catch {}

  try {
    fs.writeFileSync(
      `cryptopunks/crypto_punks_metadata.json`,
      JSON.stringify(newData)
    );
  } catch (ex) {
    console.error(`couldn't write metadata`, ex);
  }
}

Exec();

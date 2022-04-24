import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const Exec = async () => {
  const blockchains = ["ethereum", "polygon", "arbitrum", "optimism"];

  for (const blockchain of blockchains) {
    const tokenIds = fs.readdirSync(`./blockchains/${blockchain}/assets`);

    for (const tokenId of tokenIds) {
      try {
        console.log(`starting token ${blockchain} ${tokenId}`);

        fs.copyFileSync(
          `./blockchains/${blockchain}/assets/${tokenId}/logo.png`,
          `./tokens/${blockchain}/${tokenId.toLowerCase()}.png`
        );
      } catch (ex) {
        console.error(`error on token ${blockchain} ${tokenId}`, ex);
      }
    }
  }
};

Exec();

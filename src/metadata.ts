import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const Exec = async () => {
  const blockchains = ["ethereum", "polygon", "arbitrum", "optimism"];

  for (const blockchain of blockchains) {
    const tokenInfo = [];
    const tokenIds = fs.readdirSync(`./blockchains/${blockchain}/assets`);

    for (const tokenId of tokenIds) {
      try {
        console.log(`starting token ${blockchain} ${tokenId}`);

        tokenInfo.push(
          JSON.parse(
            fs.readFileSync(
              `./blockchains/${blockchain}/assets/${tokenId}/info.json`,
              "utf8"
            )
          )
        );
      } catch (ex) {
        console.error(`error on token ${blockchain} ${tokenId}`, ex);
      }
    }

    try {
      fs.unlinkSync(`tokens/${blockchain}.json`);
    } catch {}

    try {
      console.log(`writing json info for ${blockchain}`);
      fs.writeFileSync(`tokens/${blockchain}.json`, JSON.stringify(tokenInfo));
    } catch (ex) {
      console.error(`couldn't write info for ${blockchain}`, ex);
    }
  }
};

Exec();

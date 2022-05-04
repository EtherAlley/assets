import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

type Token = {
  id: string;
  name: string;
  symbol: string;
  decimals: string;
  status: string;
};
const Exec = async () => {
  const blockchains = ["ethereum", "polygon", "arbitrum", "optimism"];

  for (const blockchain of blockchains) {
    const tokenIds = fs.readdirSync(`./blockchains/${blockchain}/assets`);
    const metadata: any = {};

    for (const tokenId of tokenIds) {
      try {
        const token: Token = JSON.parse(
          fs.readFileSync(
            `./blockchains/${blockchain}/assets/${tokenId}/info.json`,
            "utf8"
          )
        );

        if (token.status === "active") {
          metadata[token.id.toLowerCase()] = {
            name: token.name,
            symbol: token.symbol,
            decimals: token.decimals,
          };
        } else {
          console.log(`skipping token ${blockchain} ${tokenId}`);
        }
      } catch (ex) {
        console.error(`error on token ${blockchain} ${tokenId}`, ex);
      }
    }

    try {
      fs.unlinkSync(`metadata/${blockchain}.json`);
    } catch {}

    try {
      console.log(`writing json info for ${blockchain}`);
      fs.writeFileSync(`metadata/${blockchain}.json`, JSON.stringify(metadata));
    } catch (ex) {
      console.error(`couldn't write info for ${blockchain}`, ex);
    }
  }
};

Exec();

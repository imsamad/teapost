import * as dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../", `config`, ".env"),
});

import "colors";

import connectDB from "../src/db/connectDB";

import { deleteData, importData } from "./utils";

(async () => {
  console.log("From script", process.argv);
  console.time("Processing time ".green);

  await connectDB(true);

  if (process.argv[2] == "-d") await deleteData();
  else await importData(process.argv[2] == "-k");

  console.timeEnd("Processing time ".green);

  // await seeder.totalDocs();
  // process.off
  // process.abort();
  // return;
  // process.exit(0);
})();

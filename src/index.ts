import "dotenv/config";
import { checkCourses } from "./handler/check-courses";
import { loadConfig } from "./handler/load-config";
import { getRandomDelayInMinutes } from "./utils/get-random-delay-number";
import express from "express";
import { log } from "console-log-colors";
import { logger } from "./utils/logger";
const fs = require("fs");
const config = loadConfig();

async function main() {
  while (true) {
    console.log("Running...");
    logger.info("Running at: " + new Date().toISOString());
    await checkCourses();

    const startRange = config.delay.from;
    const endRange = config.delay.to;
    let randomDelay = getRandomDelayInMinutes(startRange, endRange);

    console.log("\n--------------------------------------------------\n");

    //Số phút delay
    console.log("Delay: ", randomDelay / 1000 / 60, " phút");

    await new Promise((resolve) => setTimeout(resolve, randomDelay));
  }
}

main();

const app = express();

app.get("/log", (req, res) => {
  const logs = fs.readFileSync("result.log", "utf8");
  res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <pre>${logs}</pre>
</body>
</html>`);
});

app.get("/config-detail", (req, res) => {
  res.send(config);
});

app.get("/checkpoint", (req, res) => {
  res.send("Server is alive!");
});

app.get("/clean-log", (req, res) => {
  fs.writeFileSync("result.log", "");
  res.send("Cleaned log file!");
});

app.get("/", (req, res) => {
  const workspaceDir = process.cwd();
  res.sendFile(workspaceDir + "/views/index.html");
});

app.listen(process.env.PORT || 4000, () => {
  log(`Server is running on port ${process.env.PORT || 4000}`, "green");
});

import "dotenv/config";
import { checkCourses } from "./handler/check-courses";
import { loadConfig } from "./handler/load-config";
import { getRandomDelayInMinutes } from "./utils/get-random-delay-number";
const config = loadConfig();

async function main() {
  while (true) {
    console.log("Running...");
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

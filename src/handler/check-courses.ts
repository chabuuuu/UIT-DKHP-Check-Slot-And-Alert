import axios from "axios";
import { log } from "console-log-colors";
import { loadConfig } from "./load-config";
import { logger } from "../utils/logger";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_MESSAGE_API = `https://api.telegram.org/${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=`;
const UIT_COURSES_API = "https://dkhpapi.uit.edu.vn/courses";
const config = loadConfig();

export async function checkCourses() {
  try {
    const response = await axios.get(UIT_COURSES_API, {
      headers: {
        Authorization: process.env.UIT_PROFILE_TOKEN,
      },
    });

    const coursesListAvailable = response.data.courses;

    const coursesToCheck = config.courses;

    for (let courses of coursesToCheck) {
      console.log("\n--------------------------------------------------\n");

      log(`Đang kiểm tra lớp: ${courses}...`, "yellow");

      const matchedCourse = coursesListAvailable.filter(
        (item: any) => item.malop === courses
      )[0];

      if (config.print_course_detail) {
        console.log("Thông tin hiện tại trên server trường: ", matchedCourse);
      }

      if (matchedCourse.dadk < matchedCourse.siso) {
        const notifiMessage = `Có lớp ${courses} - Còn trống ${
          matchedCourse.siso - matchedCourse.dadk
        } chỗ`;

        log(notifiMessage, "green");
        //Send message to telegram
        axios.get(TELEGRAM_MESSAGE_API + notifiMessage);

        logger.info(notifiMessage);
      } else {
        log(`Không còn slot cho lớp ${courses}`, "red");
      }
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

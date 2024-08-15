const fs = require("fs");

export type Config = {
  courses: string[];
  delay: {
    from: number;
    to: number;
  };
  print_course_detail: boolean;
};

let config: Config | null = null;

export function loadConfig(): Config {
  try {
    if (config) {
      return config;
    }
    const data = fs.readFileSync("course-check-list.json", "utf8");
    config = JSON.parse(data);
    if (!config) {
      throw new Error("Error loading config");
    }
    return config!;
  } catch (error) {
    throw error;
  }
}

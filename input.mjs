import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function readInput(file) {
    return readFileSync(path.join(__dirname, file), "utf8");
}

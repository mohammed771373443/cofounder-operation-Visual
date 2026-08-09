import { cp, mkdir, readFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const required = ["index.html", "styles.css", "content.js", "app.js", "_headers"];

for (const file of required) await readFile(path.join(root, file));

const context = { window: {} };
vm.createContext(context);
vm.runInContext(await readFile(path.join(root, "content.js"), "utf8"), context);
const data = context.window.WASLA_GUIDE;
if (!data || data.states.length !== 12 || data.journey.length < 15 || data.messages.length < 10) {
  throw new Error("Guide content is incomplete.");
}
const stateCodes = new Set(data.states.map(item => item.code));
for (const state of data.states) {
  for (const next of state.next) if (!stateCodes.has(next)) throw new Error(`Unknown transition: ${state.code} -> ${next}`);
}
for (const stage of data.journey) {
  if (stage.state && !stateCodes.has(stage.state)) throw new Error(`Unknown journey state: ${stage.state}`);
}
await import(path.join(root, "app.js").replaceAll("\\", "/")).catch(error => {
  if (!String(error).includes("window is not defined")) throw error;
});

if (!process.argv.includes("--check")) {
  const dist = path.join(root, "dist");
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  for (const file of required) await cp(path.join(root, file), path.join(dist, file));
  console.log(`Built ${required.length} static files in ${dist}`);
} else {
  console.log("Static guide validation passed.");
}

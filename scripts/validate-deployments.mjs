export const paletteIds = ["deep-water-red", "stone-vermilion", "ink-teal"];

export function validateManifest(manifest) {
  if (manifest?.schemaVersion !== 1 || !manifest.applications || Array.isArray(manifest.applications)) {
    throw new Error("Deployment settings must use schemaVersion 1 and an applications object");
  }
  const entries = Object.entries(manifest.applications);
  if (!entries.length) throw new Error("At least one app deployment must be configured");
  for (const [name, app] of entries) {
    if (!/^[a-z0-9-]+$/.test(name)) throw new Error(`Invalid app name: ${name}`);
    if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(app.repository ?? "")) {
      throw new Error(`Invalid repository for ${name}`);
    }
    if (!/^\d+\.\d+\.\d+$/.test(app.version ?? "")) {
      throw new Error(`Expected a pinned semantic version for ${name}`);
    }
    if (!paletteIds.includes(app.palette)) throw new Error(`Unknown palette for ${name}: ${app.palette}`);
  }
  return true;
}

if (process.argv[1]?.endsWith("validate-deployments.mjs")) {
  const { readFile } = await import("node:fs/promises");
  validateManifest(JSON.parse(await readFile("deployments.json", "utf8")));
  console.log("App deployment settings are valid.");
}

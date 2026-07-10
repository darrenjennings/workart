import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import process from "node:process";

const apiBaseUrl =
  process.env.WORKART_ARCHIVE_API_URL ?? "https://workart.guuu.workers.dev/api";
const rootDir = path.resolve(import.meta.dirname, "..");
const outputFile = path.join(rootDir, "src/data/data_archive.ts");
const legacyFile = path.join(rootDir, "src/data/data2022.ts");
const [startDate = "2023-01-01", endDate = "2023-12-31"] = process.argv.slice(2);

function getDatesInRange(start, end) {
  const dates = [];
  const current = new Date(`${start}T00:00:00.000Z`);
  const stop = new Date(`${end}T00:00:00.000Z`);

  while (current <= stop) {
    dates.push(current.toISOString().split("T")[0]);
    current.setUTCDate(current.getUTCDate() + 1);
  }

  return dates;
}

async function readArchiveData() {
  for (const file of [outputFile, legacyFile]) {
    try {
      const source = await fs.readFile(file, "utf8");
      const expression = source
        .replace(/^export const data = /, "")
        .replace(/;\s*$/, "");

      return vm.runInNewContext(expression);
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
  }

  return [];
}

async function fetchArchiveEntry(date) {
  const response = await fetch(`${apiBaseUrl}/${date}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Request for ${date} failed with ${response.status} ${response.statusText}`,
    );
  }

  return {
    key: date,
    value: await response.json(),
  };
}

async function main() {
  const existingData = await readArchiveData();
  const entriesByDate = new Map(existingData.map((entry) => [entry.key, entry]));

  for (const date of getDatesInRange(startDate, endDate)) {
    if (entriesByDate.has(date)) {
      continue;
    }

    const entry = await fetchArchiveEntry(date);

    if (entry) {
      entriesByDate.set(date, entry);
      console.log(`Archived ${date}`);
    } else {
      console.log(`No archive for ${date}`);
    }
  }

  const output = Array.from(entriesByDate.values()).sort((left, right) =>
    left.key.localeCompare(right.key),
  );

  await fs.writeFile(
    outputFile,
    `export const data = ${JSON.stringify(output, null, 2)};\n`,
  );

  console.log(`Wrote ${output.length} archived entries to ${outputFile}`);
}

await main();

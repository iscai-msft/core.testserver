import fs from "fs";
import { join } from "path";
import { logger } from "../logger";
import { ensureDir } from "../utils";

export interface CoverageMap {
  [name: string]: number;
}

export class CoverageService {
  public coverageDirectory = "./coverage";

  private coverage: CoverageMap = {};

  public get(): CoverageMap {
    return this.coverage ?? {};
  }

  /**
   * Track usage of a scenario.
   * @param name Name of the scenario.
   * @param value {Optional} For legacy test set the value of the usage.
   */
  public async track(name: string): Promise<void> {
    let map = this.coverage;
    if (!map) {
      map = this.coverage = {};
    }

    if (!(name in map)) {
      map[name] = 0;
    }

    map[name] += 1;
    await this.saveCoverage();
  }

  public register(name: string): void {
    let map = this.coverage;
    if (!map) {
      map = this.coverage = {};
    }

    if (name in map) {
      throw new Error(`Name '${name}' already exists. Make sure it is unique.`);
    }
    map[name] = 0;
  }

  public reset(): void {
    for (const name of Object.values(this.coverage)) {
        this.coverage[name] = 0;
    }
  }

  private async saveCoverage() {
    await ensureDir(this.coverageDirectory);
    const path = join(this.coverageDirectory, `report.json`);

    try {
      await fs.promises.writeFile(path, JSON.stringify(this.coverage, null, 2));
    } catch (e) {
      logger.warn("Error while saving coverage", e);
    }
  }
}

export const coverageService = new CoverageService();

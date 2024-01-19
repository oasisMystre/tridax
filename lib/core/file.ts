import ExifParser from "exif-parser";
import { Observable } from "./observable";

import type { Plugin, File, FileExtension } from "../types";

export type Exif = ReturnType<
  ReturnType<(typeof ExifParser)["create"]>["parse"]
>;

export abstract class FileImpl extends Observable implements File {
  #plugins: Map<string, Plugin>;
  protected abstract file: Buffer;
  protected abstract exif: Exif;

  constructor() {
    super();
  }

  registerPlugin(plugin: Plugin) {
    this.#plugins.set(plugin.pluginName, plugin);
  }

  abstract save(): Promise<void>;
  abstract transform(): Promise<void>;
  abstract apply(name: string, transform: any): void;
  abstract open(name: string, extension: FileExtension): Promise<void>;
}

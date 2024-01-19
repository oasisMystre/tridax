import { readFile } from "fs";
import ExifParser from "exif-parser";

import { FileImpl, type Exif } from "../core/file";

export class ImageFile extends FileImpl {
  protected file: Buffer;
  protected exif: Exif;

  save(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async open(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      readFile(path, (err, data) => {
        if (err) reject(err);
        this.file = data;

        try {
          const parser = ExifParser.create(data);
          this.exif = parser.parse();
        } catch (error) {
          reject(error);
        }
        resolve();
      });
    });
  }

  transform(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  apply(name: string, transform: any) {
    const writer = ExifParser.create()
  }
}

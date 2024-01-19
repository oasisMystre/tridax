import { Plugin } from "./plugin";

export enum FileExtension {
  TRX = "trx",
  PDX = "pdx",
}

export type File = {
  save: () => Promise<void>;
  registerPlugin: (plugin: Plugin) => void;
  apply(name: string, transform: any): void;
  open: (name: string, extension: FileExtension) => Promise<any>;
  addEventListener: <T extends Function>(event: string, fn: T) => any;
  removeEventListener: <T extends Function>(event: string, fn: T) => any;
};

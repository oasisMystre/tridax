export type Plugin = {
  pluginName: string;
  install(): void;
};

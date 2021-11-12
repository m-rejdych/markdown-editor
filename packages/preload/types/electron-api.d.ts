interface ElectronApi {
  readonly versions: Readonly<NodeJS.ProcessVersions>
  close: () => void;
  minimize: () => void;
  maximize: () => void;
}

declare interface Window {
  electron: Readonly<ElectronApi>
  electronRequire?: NodeRequire
}

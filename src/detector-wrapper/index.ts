import { instantiateCachedURL } from './util';

export type ModuleInitialize = (instance: ModuleClass) => void;

export type ModuleOptions = {
  init: ModuleInitialize;
  version: number;
  wasmUrl: string;
};

export class ModuleClass {
  private _init: ModuleInitialize;
  private _version: number;
  private _wasmUrl: string;

  public constructor({ init, version, wasmUrl }: ModuleOptions) {
    this._init = init;
    this._version = version;
    this._wasmUrl = wasmUrl;
  }

  public locateFile(baseName: string) {
    return self.location.pathname.replace(/\[^\/]*$/, '/') + baseName;
  }

  public instantiateWasm(
    imports: any,
    callback: (instance: WebAssembly.Instance) => void,
  ) {
    instantiateCachedURL(this._version, this._wasmUrl, imports).then(
      (instance) => callback(instance),
    );

    return {};
  }

  public onInit(callback: ModuleInitialize) {
    this._init = callback;
  }

  public onRuntimeInitialized() {
    if (this._init) {
      return this._init(this);
    }
  }
}

export declare class SimpleFork {
    private _path;
    private _fnName;
    private _call;
    private _forkedProcess;
    constructor(processPath: string);
    fork(fnName: string, ...args: any[]): Function;
    end(): void;
    private setup;
    private send;
    private startChild;
    private stopChild;
    private receive;
    private exit;
}

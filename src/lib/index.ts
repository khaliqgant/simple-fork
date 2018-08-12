const fork = require('./fork');

export class SimpleFork {

  private _path: string;

  private _fnName: string;

  private _call: any = {};

  private _forkedProcess: any;

  constructor(processPath: string) {

    this._path = processPath;

  }

  public fork(fnName: string, ...args: any[]): Function {

    this._fnName = fnName;
    const forkCall = this.setup();

    return forkCall;

  }

  public end() {

    this.stopChild();

  }

  private setup() {

    return (...args: any[]) => {
      const fnArgs = args.slice(0);
      this._call = {
        method: this._fnName,
        callback: fnArgs.pop(),
        args: fnArgs
      };
      this.startChild();
      this.send();
    }

  }

  private send() {

    this._forkedProcess.send(this._call);

  }

  private startChild() {

    this._forkedProcess = fork.run(this._path, {
      maxConcurrentWorkers: 1,
      forcedKillTime: 100,
    });
    this._forkedProcess.child.on('message', this.receive.bind(this))
    this._forkedProcess.child.once('exit', this.exit.bind(this));
    this._forkedProcess.child.exitCode = null;

  }

  private stopChild() {

    this._forkedProcess.send('die');

    setTimeout(() => {
      if (this._forkedProcess.child.exitCode === null) {
        this._forkedProcess.child.kill('SIGKILL')
      }
    }, 100).unref();

  }

  private receive(data: any) {

    const { args } = data;

    process.nextTick(() => {

      this._call.callback.apply(null, args)

    });

    this.end();

  }

  private exit(code: any) {

    this.stopChild();

  }

}

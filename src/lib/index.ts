import { ForkCall } from '../interfaces/SimpleFork';
const fork = require('./fork');

/**
 *
 * Simple Fork
 * @desc take in a script path and setup a fork that can call a method
 * once a forked process has been created
 *
 */
export class SimpleFork {

  private _path: string;

  private _fnName: string;

  private _call: ForkCall;

  private _forkedProcess: any;

  constructor(processPath: string) {

    this._path = processPath;

  }

  /**
   *
   * Fork
   * @desc store the function name that we want to execute in a forked process
   * and setup a fork that will be executed by the caller later
   *
   */
  public fork(fnName: string, ...args: any[]): Function {

    this._fnName = fnName;
    const forkCall = this.setup();

    return forkCall;

  }

  /**
   *
   * End
   * @desc stop the fork process
   *
   */
  public end() {

    this.stopChild();

  }

  /**
   *
   * Setup
   * @desc return a function for the caller to call to call a method within
   * the forked process. Start the child process and send the call information
   * needed to run the method when called
   *
   */
  private setup(): Function {

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

  /**
   *
   * Send
   * @desc send the call data to the child forked process
   *
   */
  private send() {

    this._forkedProcess.send(this._call);

  }

  /**
   *
   * Start Child
   * @desc instantiate a forked process via a wrapper around the fork call
   *
   */
  private startChild() {

    this._forkedProcess = fork.run(this._path, {
      maxConcurrentWorkers: 1,
      forcedKillTime: 100,
    });
    this._forkedProcess.child.on('message', this.receive.bind(this))
    this._forkedProcess.child.once('exit', this.exit.bind(this));
    this._forkedProcess.child.exitCode = null;

  }

  /**
   *
   * Stop Child
   * @desc send a die command to the forked process and send a kill signal
   * as well if that is not processed
   *
   */
  private stopChild() {

    this._forkedProcess.send('die');

    setTimeout(() => {
      if (this._forkedProcess.child.exitCode === null) {
        this._forkedProcess.child.kill('SIGKILL')
      }
    }, 100).unref();

  }

  /**
   *
   * Receive
   * @desc receive any data sent from the caller and apply it to the
   * callback function
   *
   */
  private receive(data: any) {

    const { args } = data;

    process.nextTick(() => {

      this._call.callback.apply(null, args)

    });

    this.end();

  }

  private exit(code: number) {

    this.stopChild();

  }

}

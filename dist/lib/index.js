"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fork = require('./fork');
class SimpleFork {
    constructor(processPath) {
        this._call = {};
        this._path = processPath;
    }
    fork(fnName, ...args) {
        this._fnName = fnName;
        const forkCall = this.setup();
        return forkCall;
    }
    end() {
        this.stopChild();
    }
    setup() {
        return (...args) => {
            const fnArgs = args.slice(0);
            this._call = {
                method: this._fnName,
                callback: fnArgs.pop(),
                args: fnArgs
            };
            this.startChild();
            this.send();
        };
    }
    send() {
        this._forkedProcess.send(this._call);
    }
    startChild() {
        this._forkedProcess = fork.run(this._path, {
            maxConcurrentWorkers: 1,
            forcedKillTime: 100,
        });
        this._forkedProcess.child.on('message', this.receive.bind(this));
        this._forkedProcess.child.once('exit', this.exit.bind(this));
        this._forkedProcess.child.exitCode = null;
    }
    stopChild() {
        this._forkedProcess.send('die');
        setTimeout(() => {
            if (this._forkedProcess.child.exitCode === null) {
                this._forkedProcess.child.kill('SIGKILL');
            }
        }, 100).unref();
    }
    receive(data) {
        const { args } = data;
        process.nextTick(() => {
            this._call.callback.apply(null, args);
        });
        this.end();
    }
    exit(code) {
        this.stopChild();
    }
}
exports.SimpleFork = SimpleFork;
//# sourceMappingURL=index.js.map
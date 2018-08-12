"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = require('child_process');
const childModule = require.resolve('./child');
function run(forkModule, workerOptions) {
    const options = Object.assign({}, workerOptions, { execArgv: process.execArgv, env: process.env, cwd: process.cwd() });
    const child = childProcess.fork(childModule, process.argv, options);
    child.on('error', function () {
        // this *should* be picked up by onExit and the operation requeued
    });
    child.send({ module: forkModule });
    // return a send() function for this child
    return {
        send: child.send.bind(child),
        child: child
    };
}
exports.run = run;
//# sourceMappingURL=fork.js.map
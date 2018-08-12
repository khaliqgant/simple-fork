"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
const path = require('path');
function test() {
    const sp = new lib_1.SimpleFork(require.resolve(`${__dirname}/${path.basename(__filename)}`));
    const childProcess = sp.fork('randomProcess');
    childProcess('childProcessArgument', (arg) => {
        console.log('callback', arg);
        sp.end();
    });
}
exports.test = test;
function randomProcess(arg, fn) {
    console.log('child running', arg);
    fn('foo');
}
exports.randomProcess = randomProcess;
//# sourceMappingURL=sameFunction.test.js.map
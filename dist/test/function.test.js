"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
const path = require('path');
const sp = new lib_1.SimpleFork(require.resolve('../scripts/randomProcess'));
const childProcess = sp.fork('run');
childProcess('childProcessArgument', (arg) => {
    console.log('callback', arg);
});
//# sourceMappingURL=function.test.js.map
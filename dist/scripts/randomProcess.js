"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function run(arg, fn) {
    console.log('child running', arg);
    fn('foo');
}
exports.default = run;
//# sourceMappingURL=randomProcess.js.map
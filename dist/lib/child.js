let runModule;
function run(processData) {
    const { method, args } = processData;
    const callback = (...childArgs) => {
        const _args = childArgs.slice(0);
        process.send({
            args: _args,
        });
    };
    let exec;
    if (runModule.default) {
        exec = runModule.default;
    }
    else {
        exec = runModule[method];
    }
    exec.apply(null, args.concat([callback]));
}
process.on('message', (data) => {
    if (!runModule) {
        return runModule = require(data.module);
    }
    if (data === 'die') {
        return process.exit(0);
    }
    run(data);
});
//# sourceMappingURL=child.js.map
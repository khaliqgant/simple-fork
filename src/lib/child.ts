let runModule: any;

function run(processData: any) {
  const { method, args } = processData;

  const callback = (...childArgs: any[]) => {

    const _args = childArgs.slice(0);

    process.send({
      args: _args,
    });

  }

  let exec: any;
  if (runModule.default) {
    exec = runModule.default;
  } else {
    exec = runModule[method];
  }

  exec.apply(null, args.concat([ callback ]));
}

process.on('message', (data: any) => {
  if (!runModule) {
    return runModule = require(data.module);
  }
  if (data === 'die') {
    return process.exit(0);
  }
  run(data)
});

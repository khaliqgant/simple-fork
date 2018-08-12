const childProcess = require('child_process')
const childModule  = require.resolve('./child')


export function run (forkModule: any, workerOptions: any) {
  const options = {
    ...workerOptions,
    execArgv : process.execArgv,
    env      : process.env,
    cwd      : process.cwd()
  };

  const child = childProcess.fork(childModule, process.argv, options)

  child.on('error', function() {
    // this *should* be picked up by onExit and the operation requeued
  });

  child.send({ module: forkModule })

  // return a send() function for this child
  return {
    send: child.send.bind(child),
    child: child
  };
}

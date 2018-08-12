import { SimpleFork } from '../lib';

const path = require('path');

export function test() {

  const sp = new SimpleFork(require.resolve(`${__dirname}/${path.basename(__filename)}`));
  const childProcess: any = sp.fork('randomProcess');
  childProcess('childProcessArgument', (arg: any) => {

    console.log('callback', arg);
    sp.end();

  });

}


export function randomProcess(arg: any, fn: Function) {

  console.log('child running', arg);
  fn('foo');

}


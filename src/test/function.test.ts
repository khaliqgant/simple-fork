import { SimpleFork } from '../lib';

const path = require('path');

const sp = new SimpleFork(require.resolve('../scripts/randomProcess'));
const childProcess: any = sp.fork('run');
childProcess('childProcessArgument', (arg: any) => {

  console.log('callback', arg);

});






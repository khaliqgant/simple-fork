Simple Fork
==================
> Forking in node.js simplified. Fork a method with no extra effort.

# Inspiration
* I needed to run a long running process (Elasticsearch bulk index) in the background
so as to not block the event loop so the entire app would not come to a crawl.
The process was implemented as a method and so the best option was
to fork that method and offload that process.

# Usage
* Call a method in the same file to run in a forked process:
```
import { SimpleFork } from 'simple-fork';

const sp = new SimpleFork(require.resolve(`${__dirname}/${path.basename(__filename)}`));

// pass in the function name as a string
const childProcess: any = sp.fork('randomProcess');

// send any arguments to the function with a callback to receive anything back
childProcess('childProcessArgument', (arg: any) => {

    // will print callback foo
    console.log('callback', arg);
    sp.end();

  });

}


export function randomProcess(arg: any, fn: Function) {

  // will print running childProcessArgument
  console.log('child running', arg);
  fn('foo');

}

```

* Call a method in a different file
```
import { SimpleFork } from 'simple-fork';

const sp = new SimpleFork(require.resolve('../scripts/randomProcess'));
const childProcess: any = sp.fork('run');
childProcess('childProcessArgument', (arg: any) => {

  console.log('callback', arg);

});
```

# References
* [Child Process Documentation](https://nodejs.org/api/child_process.html)
* Largely a simplified fork of [node-worker-farm](https://github.com/rvagg/node-worker-farm)
